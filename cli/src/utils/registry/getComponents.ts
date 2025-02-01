import { z } from "zod";
import { REGISTRY } from "../API/API.js";

const registrySchema = z.object({
  components: z.array(
    z.object({
      name: z.string(),
      content: z.string(),
    })
  ),
  dependencies: z.array(z.string()),
  devDependencies: z.array(z.string()),
});

export type RegistryResponse = z.infer<typeof registrySchema>;

export async function getComponents(name: string[]) {
  const response = await REGISTRY.get(`?components=${name.join(",")}`);
  const components = registrySchema.parse(response?.data);
  return components;
}
