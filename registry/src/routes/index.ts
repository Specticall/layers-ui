import componentRouter from "./componentRouter";
import { Router } from "express";

const router = Router();

/**
 * Insert your router here
 * @example router.use("/example", exampleRouter)
 */

router.use("/", componentRouter);

export default router;
