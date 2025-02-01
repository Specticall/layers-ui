# layers-ui
Customizable & headless React component collection library


Follow these steps to set up the `layers-ui` library in your Vite project:

1. **Install Tailwind CSS**

  Install Tailwind CSS (preferably version 4.0) by following the [official documentation](https://tailwindcss.com/docs/installation).

2. **Configure TypeScript Paths in `tsconfig.app.json`**

  Add the following configuration to your `tsconfig.app.json` to set up path aliases:

  ```ts
  {
    "compilerOptions": {
     // Other options...
     /////////////////////////////////////
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    /////////////////////////////////////
    },
    // Other configs...
  }
  ```

3. **Configure TypeScript Paths in `tsconfig.json`**

  Add the following configuration to your `tsconfig.json` to reference the `tsconfig.app.json` and set up path aliases:

  ```json
  {
    "files": [],
    "references": [
      { "path": "./tsconfig.app.json" },
      { "path": "./tsconfig.node.json" }
    ],
    /////////////////////////////////////
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    }
    /////////////////////////////////////
  }
  ```

4. **Install Node Types Package**

  Install the Node.js types package to ensure proper type definitions:

  ```bash
  npm install @types/node
  ```

5. **Configure Vite**

  Update your `vite.config.ts` to include necessary plugins and path aliases:

  ```ts
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react-swc";
  import tailwindcss from "@tailwindcss/vite";
  /////////////////////////////////////
  import path from "path";
  /////////////////////////////////////

  //// https://vite.dev/config/
  export default defineConfig({
    plugins: [react(), tailwindcss()],
    /////////////////////////////////////
    resolve: {
     alias: {
      "@": path.resolve(__dirname, "./src"),
     },
    },
    /////////////////////////////////////
  });
  ```

6. **Install Layers CLI**

  Install the `layers-cli` package to manage your components:

  ```bash
  npm install layers-cli
  ```

7. **Initialize Layers CLI**

  Run the initialization command and follow the on-screen instructions:

  ```bash
  npx layers-cli init
  ```

8. **Add Components**

  You can start adding components using the following command. If you don't specify `<component-names>`, a selection prompt will appear.

  ```bash
  npx layers-cli add <component-names?>
  ```

You are now ready to use `layers-ui` in your project!

