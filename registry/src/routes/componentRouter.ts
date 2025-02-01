import { Router } from "express";
import { ComponentController } from "../controllers";

const componentRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
componentRouter.get("/", ComponentController.getComponent);
componentRouter.get("/names", ComponentController.getComponentNames);

export default componentRouter;
