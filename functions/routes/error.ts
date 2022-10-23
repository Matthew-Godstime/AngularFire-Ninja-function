import express, { Router } from "express";
import { internalServerError, pageNotFound } from "../controllers/error";

const errorRouter: Router = express.Router();

errorRouter.use(pageNotFound);
errorRouter.use(internalServerError);

export default errorRouter;