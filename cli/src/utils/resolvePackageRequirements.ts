import path from "path";
import { ConfigSchema } from "./getConfig.js";
import fs from "fs/promises";

const REACT_LOADING_SKELETON_CSS_IMPORT = `import 'react-loading-skeleton/dist/skeleton.css'`;

const list = {
  "react-loading-skeleton": async (config: ConfigSchema) => {
    if (config.using === "vite") {
      const mainFilePath = path.resolve(process.cwd(), "./src/main.tsx");
      const mainFile = await fs.readFile(mainFilePath, "utf-8");

      if (!mainFile.includes("react-loading-skeleton/dist/skeleton.css")) {
        await fs.writeFile(
          mainFilePath,
          `${REACT_LOADING_SKELETON_CSS_IMPORT}\n${mainFile}`
        );
      }
    }
    // TODO : Implement for cra and next
  },
};

/**
 * Some packages like react-loading-skeleton requires the user to add a css import inside their code somewhere. This function is made to resolve those needs
 */
export async function resolvePackageRequirements(
  packageName: string,
  config: ConfigSchema
) {
  if (packageName in list) {
    const resolver = list[packageName as keyof typeof list];
    await resolver(config);
  }
}
