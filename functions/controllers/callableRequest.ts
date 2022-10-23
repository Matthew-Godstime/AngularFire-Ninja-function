import { CallableContext } from "firebase-functions/v1/https";

function sayHello(data: any, context: CallableContext) {
    return 'Hello Ninjas'
}

// export { sayHello };