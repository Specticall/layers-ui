import { RequestHandler } from "express";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { kebabToPascalCase } from "../utils/utils";
import { dependencyList } from "../components/dependencyList";
import * as componentFiles from "../components";

type ComponentsData = {
  name: string;
  componentDependencies: string[];
  dependencies: string[];
  devDependencies: string[];
  content: string;
};

const getComponent: RequestHandler = async (request, response, next) => {
  try {
    const components = request.query.components as string | undefined;
    if (!components) {
      throw new AppError("No components was provided", STATUS.BAD_REQUEST);
    }

    // Converts the component string into pascal cased component name array
    const componentsList = components.split(",").map((name) => {
      return kebabToPascalCase(name);
    });

    // Conver the components data into an easier to use map format
    const dependencyDataList: ComponentsData[] = JSON.parse(dependencyList);
    const dependencyMap: Record<string, ComponentsData> = {};
    dependencyDataList.forEach((component) => {
      dependencyMap[component.name] = component;
    });

    // Resolve the component dependecy list using the bfs method
    const dependenciesToBeInstalled = new Set<string>();
    const devDependenciesToBeInstalled = new Set<string>();
    const toBeInstalled: string[] = [];
    const queue = componentsList;

    while (queue.length > 0) {
      const name = queue.shift();
      if (!name) continue;

      const component = dependencyMap[name];
      if (!component) {
        throw new AppError(`Component ${name} not found`, STATUS.NOT_FOUND);
      }

      if (!toBeInstalled.includes(name)) {
        component.componentDependencies.forEach((dependencyName) => {
          queue.push(kebabToPascalCase(dependencyName));
        });

        component.dependencies.forEach((name) =>
          dependenciesToBeInstalled.add(name)
        );

        component.devDependencies.forEach((name) =>
          devDependenciesToBeInstalled.add(name)
        );

        toBeInstalled.push(name);
      }
    }

    response.send({
      components: toBeInstalled.map((name) => {
        return {
          name,
          content: (componentFiles as Record<string, string>)[name]
            .replace(/\\`/g, "`")
            .replace(/\\\$\{/g, "${")
            .replace(/^\n+/, ""),
        };
      }),
      dependencies: Array.from(dependenciesToBeInstalled),
      devDependencies: Array.from(devDependenciesToBeInstalled),
    });
  } catch (error) {
    next(error);
  }
};

const getComponentNames: RequestHandler = async (request, response, next) => {
  try {
    const dependencyDataList: ComponentsData[] = JSON.parse(dependencyList);
    const allComponentNames = dependencyDataList.map((dep) => dep.name);

    response.send({
      data: allComponentNames,
    });
  } catch (error) {
    next(error);
  }
};

export default { getComponent, getComponentNames };
