import { z } from "zod";
import { REGISTRY } from "../API/API.js";

const nameSchema = z.object({ data: z.array(z.string()) });

export async function getComponentNames() {
  const response = await REGISTRY.get("/names");
  const names = nameSchema.parse(response?.data).data;
  return names;
}
