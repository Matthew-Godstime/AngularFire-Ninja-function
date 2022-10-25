import { auth, https } from "firebase-functions";
import admin from "firebase-admin";
import permission from "../src/admin.js";
import { CallableContext } from "firebase-functions/v1/https";
import { ReqData, UpVote, UserData } from "../models/requests.js";

// Admin Permission
permission();


// Auth trigger for a new user sign up
function newUserSignUp(user: auth.UserRecord): Promise<FirebaseFirestore.WriteResult> {
    // For background trigger you must return a value/promise
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        upVotedOn: []
    } as UserData);
}

// Auth trigger (user deleted)
function userDeleted(user: auth.UserRecord): Promise<FirebaseFirestore.WriteResult> {
    // For background trigger you must return a value/promise
    return admin.firestore().collection('users').doc(user.uid).delete();
}

// Http callable function that receives the user's new request list of tutorials
function addRequest(data: ReqData, context: CallableContext): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>> {
    if (!context.auth) {
        throw new https.HttpsError('unauthenticated', "Only authenticated users can add request");
    } else if (data.text.length > 30) {
        throw new https.HttpsError('out-of-range', "Request must be no more than 30 characters long");
    } else {
        return admin.firestore().collection("requests").add({
            text: data.text,
            upvotes: 0
        } as ReqData);
    }
}

// Upvote callable function
async function upVotes(data: UpVote, context: CallableContext): Promise<FirebaseFirestore.WriteResult> {
    // Check the auth state
    if (!context.auth) {
        throw new https.HttpsError('unauthenticated', "Only authenticated users can add request");
    }
    // Get refs for user doc & requests doc
    const user = admin.firestore().collection('users').doc(context.auth.uid);
    const request = admin.firestore().collection('requests').doc(data.reqId);

    const doc = await user.get();
    // Check if user hasn't up-voted the request
    if ((doc.data() as UserData).upVotedOn.includes(data.reqId)) {
        throw new https.HttpsError('failed-precondition', "You can only upvote onces");
    }
    await user.update({
        upVotedOn: [...doc.data()?.upVotedOn, data.reqId]
    } as UserData);
    return await request.update({
        upvotes: admin.firestore.FieldValue.increment(1)
    });
}

export { newUserSignUp, userDeleted, addRequest, upVotes };