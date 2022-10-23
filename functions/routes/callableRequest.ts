import express, { Router } from "express";
import { sayHello } from "../controllers/callableRequest.js";
const callReqRouter: Router = express.Router();

// callReqRouter.get('/sayHello', sayHello)

export default callReqRouter;