import path from "path";
import fs from "fs/promises";

const cwd = process.cwd();
const COMPONENT_ORIGIN_PATH = path.resolve(
  cwd,
  "./components/src/components/ui"
);
const COMPONENT_DESTINATION_PATH = path.resolve(
  cwd,
  "./registry/src/components"
);

async function main() {
  const fileNames = await fs.readdir(COMPONENT_ORIGIN_PATH);

  // Get all component files
  const componentFiles = await Promise.all(
    fileNames.map((name) => {
      return fs.readFile(path.resolve(COMPONENT_ORIGIN_PATH, name), "utf-8");
    })
  );

  // Paste all component files
  let componentDependencyList: Record<string, string | string[]>[] = [];
  const exportStatements: string[] = [];
  fileNames.forEach(async (fileName, i) => {
    const rawComponent = componentFiles[i];
    const name = fileName.replace(".tsx", "");

    // Extract content between /* */ comments at the start of each file
    const match = rawComponent.match(/^\/\*([\s\S]*?)\*\//);
    const rawDependencyList = match ? match[1].trim() : "";
    const [componentDependencies, dependencies, devDependencies] =
      rawDependencyList.split("\r\n").map((dep) => {
        const value = dep.split("=")[1];
        if (!value) return [];
        return value.split(",");
      });
    componentDependencyList.push({
      name,
      componentDependencies,
      dependencies,
      devDependencies,
    });

    exportStatements.push(
      `export { default as ${name} } from "./data/${name}";`
    );

    // Write the components into seperate files
    const rawDependencyListWithTags = match ? match[0] : "";
    const componentFileWithoutTags = rawComponent.replace(
      rawDependencyListWithTags,
      ""
    );
    await fs.writeFile(
      path.resolve(COMPONENT_DESTINATION_PATH, `./data/${name}.ts`),
      `const ${name} = String.raw\`${componentFileWithoutTags
        .replace(/`/g, "\\`")
        .replace(/\$\{/g, "\\${")}\`;\n\nexport default ${name}`
    );
  });

  const componentDependecyListJSON = JSON.stringify(
    componentDependencyList,
    null,
    "\t"
  );
  const content = `export const dependencyList = \`${componentDependecyListJSON}\``;

  // Write the dependency list
  await fs.writeFile(
    path.resolve(COMPONENT_DESTINATION_PATH, "./dependencyList.ts"),
    content
  );

  // Write the component export file
  await fs.writeFile(
    path.resolve(COMPONENT_DESTINATION_PATH, "./index.ts"),
    exportStatements.join("\n")
  );
}

main();
