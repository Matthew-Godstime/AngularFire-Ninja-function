import express, { Router } from "express";
import callReqRouter from "./callableRequest";
import errorRouter from "./error.js";


const router: Router = express.Router();

router.use("/api", callReqRouter);
router.use("/", errorRouter)

export default router;
