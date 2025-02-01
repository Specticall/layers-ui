import axios from "axios";
import { REGISTRY_URL } from "../../config/config.js";

export const REGISTRY = axios.create({
  baseURL: REGISTRY_URL,
});
