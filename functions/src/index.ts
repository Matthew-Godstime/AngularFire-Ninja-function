import * as functions from "firebase-functions";
import { addRequest, newUserSignUp, userDeleted, upVotes } from "../controllers/auth.js";
import { fireLog } from "../controllers/callableRequest.js";
export const newUser = functions.auth.user().onCreate(newUserSignUp);
export const deleteUser = functions.auth.user().onDelete(userDeleted);
export const request = functions.https.onCall(addRequest);
export const upvote = functions.https.onCall(upVotes);

// Firestore trigger for tracking activities
export const logActivities = functions.firestore.document('{collection}/{id}').onCreate(fireLog)