import express, { Router } from "express";
import { auth } from "firebase-functions";
import { newUserSignUp, userDeleted } from "../controllers/auth.js";

const authRouter: Router = express.Router();

authRouter.use(auth.user().onCreate(newUserSignUp))
authRouter.use(auth.user().onDelete(userDeleted));
export default authRouter;