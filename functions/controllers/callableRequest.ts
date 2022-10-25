import { EventContext } from "firebase-functions/v1";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { CallableContext } from "firebase-functions/v1/https";
import admin from "firebase-admin";

function sayHelloCallable(data: any, context: CallableContext) {
    return 'Hello Ninjas'
}

function fireLog(snap: QueryDocumentSnapshot, context: EventContext): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>> | null {
    console.log(snap.data());
    
    const collection = context.params.collection;
    // const id = context.params.id;

    const activities = admin.firestore().collection('activities');

    if (collection === 'requests') {
        activities.add({ text: 'A new tutorial was added' });
    } else if (collection === 'users') {
        activities.add({ text: 'A new user just signed up' });
    }
    return null;
}

export { sayHelloCallable, fireLog };