import admin from "firebase-admin";
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const serviceAccount = require('./ninja-cloud.json');

export default function permission() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any)
    });
}