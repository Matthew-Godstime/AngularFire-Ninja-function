import express, { Router } from "express";
import authRouter from "./auth";
import errorRouter from "./error.js";


const router: Router = express.Router();

router.use("/api", authRouter);
router.use("/", errorRouter)

export default router;
