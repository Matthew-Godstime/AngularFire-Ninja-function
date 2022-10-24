import { CallableContext } from "firebase-functions/v1/https";

function sayHelloCallable(data: any, context: CallableContext) {
    return 'Hello Ninjas'
}

export { sayHelloCallable };