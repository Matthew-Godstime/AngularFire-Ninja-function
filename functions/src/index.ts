import * as functions from "firebase-functions";
import { addRequest, newUserSignUp, userDeleted, upVotes } from "../controllers/auth.js";

export const newUser = functions.auth.user().onCreate(newUserSignUp);
export const deleteUser = functions.auth.user().onDelete(userDeleted);
export const request = functions.https.onCall(addRequest);
export const upvote = functions.https.onCall(upVotes);