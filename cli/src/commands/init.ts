import { Command } from "commander";
import { logger } from "../utils/logger.js";
import prompts from "prompts";
import { z } from "zod";
import { ConfigSchema } from "../utils/getConfig.js";
import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { fileExists } from "../utils/writeFile.js";
import { cnFile } from "../config/cn.js";

const DEFAULT_COMPONENTS_PATH = "/src/components/ui";
const DEFAULT_UTILS_PATH = "/src/utils";
const DEFAULT_UTILS_NAME = "lib";

export const init = new Command()
  .name("init")
  .description("intialize your project to accept layer components")
  .action(initCommand);

const initInputSchema = z.object({
  componentPath: z.string(),
  utilsPath: z.string(),
  utilsName: z.string(),
  buildTool: z.enum(["vite", "cra", "next"]),
});

async function initCommand() {
  try {
    const response = await prompts([
      {
        type: "text",
        name: "componentPath",
        message: "Component install path?",
        initial: DEFAULT_COMPONENTS_PATH,
      },
      {
        type: "text",
        message: "Utils file install path?",
        name: "utilsPath",
        initial: DEFAULT_UTILS_PATH,
      },
      {
        type: "text",
        message: "Utils file name?",
        name: "utilsName",
        initial: DEFAULT_UTILS_NAME,
      },
      {
        type: "select",
        message: "Which build tool are you using?",
        name: "buildTool",
        initial: 0,
        choices: [
          { title: "Vite", value: "vite" },
          // { title: "Create React App", value: "cra" },
          // { title: "NextJS", value: "next" },
        ],
      },
    ]);

    const parsedResponse = initInputSchema.parse(response);

    const cwd = process.cwd();

    // Create and write config files
    const config: ConfigSchema = {
      path: {
        components: parsedResponse.componentPath,
        utils: `${parsedResponse.utilsPath}/${parsedResponse.utilsName}`,
      },
      using: parsedResponse.buildTool,
    };
    const configJSON = JSON.stringify(config, null, "\t");
    await fs.writeFile(path.resolve(cwd, "./components.json"), configJSON);

    // Create path for components
    const resolvedComponentPath = path.resolve(
      cwd,
      `.${config.path.components}`
    );
    if (!fs.stat(resolvedComponentPath)) {
      fs.mkdir(resolvedComponentPath);
    }

    // Create utils file
    const utilsFilePath = path.resolve(cwd, `.${config.path.utils}.ts`);
    const utilsFolderPath = path.resolve(cwd, `.${parsedResponse.utilsPath}`);
    if (await fileExists(utilsFilePath)) {
      const { proceed: shouldOverwrite } = await prompts({
        name: "proceed",
        type: "toggle",
        message: `The file named ${chalk.yellow(
          parsedResponse.utilsName + ".tsx"
        )} at ${chalk.yellow(
          parsedResponse.utilsPath
        )} already exists, would like to replace it?`,
        initial: true,
        active: "yes",
        inactive: "no",
      });
      if (shouldOverwrite) {
        await fs.writeFile(utilsFilePath, cnFile);
      }
    } else {
      fs.mkdir(utilsFolderPath, { recursive: true });
      await fs.writeFile(utilsFilePath, cnFile);
    }

    logger.success("Successfuly initialized project.");
  } catch (err) {
    logger.error((err as Error).message);
  }
}
