import { auth, https } from "firebase-functions";
import admin from "firebase-admin";
import permission from "../src/admin.js";
import { CallableContext } from "firebase-functions/v1/https";


permission();
// Auth trigger for a new user sign up
function newUserSignUp(user: auth.UserRecord): Promise<FirebaseFirestore.WriteResult> {
    // For background trigger you must return a value/promise
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        upVotedOn: []
    });
}

// Auth trigger (user deleted)
function userDeleted(user: auth.UserRecord): Promise<FirebaseFirestore.WriteResult> {
    // For background trigger you must return a value/promise
    return admin.firestore().collection('users').doc(user.uid).delete();
}

// Http callable function that receives the user's new request list of tutorials
function addRequest(data: any, context: CallableContext): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>> {
    if (!context.auth) {
        throw new https.HttpsError('unauthenticated', "Only authenticated users can add request");
    } else if (data.text.length > 30) {
        throw new https.HttpsError('out-of-range', "Request must be no more than 30 characters long");
    } else {
        return admin.firestore().collection("requests").add({
            text: data.text,
            upvotes: 0
        })
    }
}

function upVotes(data: any, context: CallableContext) {
    
}

export { newUserSignUp, userDeleted, addRequest, upVotes };