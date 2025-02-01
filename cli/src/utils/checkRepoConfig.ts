import fs from "fs/promises";
import { checkInstalledPackages } from "./checkInstalledPackages.js";
import { BuildTool } from "../commands/init.js";
import path from "path";
import { removeWhitespace } from "./removeWhitespace.js";
import chalk from "chalk";
import { fileExists } from "./writeFile.js";

interface Requirement {
  errorMessage: string;
  check: () => Promise<boolean | string>;
}

class FileRequirement implements Requirement {
  filePath: string;
  contentRequiredToExist: string;
  errorMessage: string;
  constructor(
    filePath: string,
    contentRequiredToExist: string,
    errorMessage: string
  ) {
    this.errorMessage = errorMessage;
    this.contentRequiredToExist = contentRequiredToExist;
    this.filePath = filePath;
  }

  async check() {
    if (!(await fileExists(this.filePath))) return this.errorMessage;
    const file = await fs.readFile(this.filePath, "utf-8");

    return (
      removeWhitespace(file).includes(
        removeWhitespace(this.contentRequiredToExist)
      ) || this.errorMessage
    );
  }
}

class PackageRequirement implements Requirement {
  packageName: string;
  installedPackages: string[];
  errorMessage: string;
  constructor(
    packageName: string,
    installedPackages: string[],
    errorMessage: string
  ) {
    this.packageName = packageName;
    this.installedPackages = installedPackages;
    this.errorMessage = errorMessage;
  }

  async check() {
    return (
      this.installedPackages.includes(this.packageName) || this.errorMessage
    );
  }
}

class ConfigChecker {
  requirements: Requirement[];
  buildTool: BuildTool;
  constructor(buildTool: BuildTool) {
    this.buildTool = buildTool;
    this.requirements = [];
  }

  addRequirement(requirement: Requirement) {
    this.requirements.push(requirement);
    return this;
  }

  async run() {
    const checks = await Promise.all(
      this.requirements.map((requirement) => {
        return requirement.check();
      })
    );
    return checks;
  }
}

const INSTALLED_PACKAGES = await checkInstalledPackages();
const cwd = process.cwd();

const checks = {
  vite: new ConfigChecker("vite")
    .addRequirement(
      new PackageRequirement(
        "tailwindcss",
        INSTALLED_PACKAGES,
        "Tailwind CSS is not installed"
      )
    )
    .addRequirement(
      new FileRequirement(
        path.resolve(cwd, "./vite.config.ts"),
        `"@": path.resolve(__dirname, "./src")`,
        "Missing path resolver in `vite.config.ts`"
      )
    )
    .addRequirement(
      new FileRequirement(
        path.resolve(cwd, "./tsconfig.app.json"),
        `"baseUrl": ".",
         "paths": {
           "@/*": ["./src/*"]
         }`,
        "Missing 'path' and 'baseURL' config is `tsconfig.app.json`"
      )
    )
    .addRequirement(
      new FileRequirement(
        path.resolve(cwd, "./tsconfig.json"),
        `"baseUrl": ".",
         "paths": {
           "@/*": ["./src/*"]
         }`,
        "Missing 'path' and 'baseURL' config is `tsconfig.json`"
      )
    ),
  cra: new ConfigChecker("cra"),
  next: new ConfigChecker("next"),
};

/**
 * Ensures the config files has been setup properly
 */
export async function checkRepoConfig(buildTool: BuildTool) {
  if (!(await fileExists(path.resolve(cwd, "./vite.config.ts")))) {
    console.log(
      chalk.red("[ERROR]"),
      "Invalid project type, layers only supports typescript projects"
    );
    return false;
  }

  const result = await checks[buildTool].run();
  const errorMessages = result.filter((result) => result !== true);
  if (errorMessages.length > 0) {
    result.forEach((errorMessage) => {
      console.log(chalk.red("[ERROR]"), errorMessage);
    });
    return false;
  }
  return true;
}
