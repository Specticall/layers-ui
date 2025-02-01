import { execa } from "execa";
import { resolvePackageRequirements } from "./resolvePackageRequirements.js";
import { getConfig } from "./getConfig.js";
import { checkInstalledPackages } from "./checkInstalledPackages.js";

type Args = {
  dependencies: string[];
  devDependencies: string[];
};

export async function installPackage({ dependencies, devDependencies }: Args) {
  // Check if the package is installed
  const installedPackages = await checkInstalledPackages();
  const dependenciesToBeInstalled = dependencies.filter(
    (dep) => !installedPackages.includes(dep)
  );
  const devDependenciesToBeInstalled = devDependencies.filter(
    (dep) => !installedPackages.includes(dep)
  );

  // Resolve package requirements
  const config = await getConfig();
  dependenciesToBeInstalled.forEach((pack) =>
    resolvePackageRequirements(pack, config)
  );
  devDependenciesToBeInstalled.forEach((pack) =>
    resolvePackageRequirements(pack, config)
  );

  if (devDependenciesToBeInstalled.length > 0) {
    await execa("npm", ["install", "-D", ...devDependenciesToBeInstalled], {
      cwd: process.cwd(),
    });
  }

  if (dependenciesToBeInstalled.length > 0) {
    await execa("npm", ["install", ...dependenciesToBeInstalled], {
      cwd: process.cwd(),
    });
  }
}
