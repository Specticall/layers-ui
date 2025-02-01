#!/usr/bin/env node
import { Command } from "commander";
import { add } from "./commands/add.js";
import { init } from "./commands/init.js";
import { config } from "dotenv";

config({ path: "./.env" });

async function main() {
  try {
    const program = new Command()
      .name("layers-ui")
      .description("Adds pre-made components to projects")
      .version("1.0.0");

    program.addCommand(add).addCommand(init);

    program.parse(process.argv);
  } catch (err) {
    console.log((err as Error).message);
  }
}

async function test() {}

if (process.argv[2] === "test") {
  test();
} else {
  main();
}
