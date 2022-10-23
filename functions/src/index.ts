import * as functions from "firebase-functions";
import express, { Application } from "express";
import cors from "cors";
import router from "../routes/index.js";
import { CallableContext } from "firebase-functions/v1/https";


const app: Application = express();
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router)
export const nff = functions.https.onRequest(app)

export const sayHello = functions.https.onCall((data: any, context: CallableContext) => {
    return 'Hello Ninjas'
})