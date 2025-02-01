import { Command } from "commander";
import { logger } from "../utils/logger.js";
import { z } from "zod";
import { getConfig } from "../utils/getConfig.js";
import prompts from "prompts";
import { installComponent } from "../utils/installComponent.js";
import chalk from "chalk";
import ora from "ora";
import { installPackage } from "../utils/installPackage.js";
import { getComponentNames } from "../utils/registry/getComponentNames.js";
import { getComponents } from "../utils/registry/getComponents.js";

const addArgumentsSchema = z.object({
  components: z.array(z.string()),
});

export const add = new Command()
  .name("add")
  .description("adds component to your project")
  .argument("[inputComponents...]", "components to add")
  .action(addCommand);

async function addCommand(inputComponents: string[]) {
  try {
    const config = await getConfig();

    const options = addArgumentsSchema.parse({ components: inputComponents });

    const availableComponentNames = await getComponentNames();

    // Check for invalid component names
    const validComponentNames: string[] = [];
    const invalidComponentNames: string[] = [];

    options.components.forEach((name) => {
      if (availableComponentNames.includes(name)) {
        validComponentNames.push(name);
      } else {
        invalidComponentNames.push(name);
      }
    });

    // Display invalid component names if they exist
    if (invalidComponentNames.length > 0) {
      console.log(
        chalk.yellow("Ignoring Invalid Component Names:"),
        invalidComponentNames.join(", ")
      );
    }

    // If user doesnt pass in a component as argument, display a prompt style menu
    let selectedComponentNames = validComponentNames;
    if (options.components.length <= 0) {
      const { components } = await prompts({
        instructions: false,
        type: "multiselect",
        hint: "Press [space] to select, [a] to select all, [enter] to submit",
        name: "components",
        message: "Select components",
        choices: availableComponentNames.map((component) => {
          return { title: component, value: component };
        }),
      });
      selectedComponentNames = components;
    }

    if (selectedComponentNames.length <= 0) {
      logger.info("No valid components selected, exiting.");
      return;
    }

    const spinner = ora("Retrieving components from registry... ");
    const { components, dependencies, devDependencies } = await getComponents(
      selectedComponentNames
    );
    spinner.stop();

    await Promise.all(
      components.map((component) => {
        return installComponent(component, config, { replace: true });
      })
    );

    // Install the necessary packages
    if (dependencies.length > 0 || devDependencies.length > 0) {
      const spinner = ora("Installing dependencies...").start();
      await installPackage({ dependencies, devDependencies });
      spinner.succeed("Completed dependency installation");
    }
  } catch (err) {
    logger.error((err as Error).message);
  }
}
