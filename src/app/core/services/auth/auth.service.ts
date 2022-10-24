import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from '@angular/fire/auth';
import { getFunctions, HttpsCallable, httpsCallable } from '@angular/fire/functions';
import { BehaviorSubject } from 'rxjs';
import { FormData } from '../../model/FormData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth) { }

  // store the URL so we can redirect after logging in
  public redirectUrl: string | null = null;
  
  /**
   * currentUser return the current user
   */
  public currentUser(cb: CallableFunction): void {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        // this.userSubject.next(user);
        cb(user)
      } else {
        cb(null)
      }
    })
  }

  
  /**
   * register a user
   */
  public register({ email, password }: FormData): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * logIn a user
   */
  public logIn({ email, password }: FormData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  

  /**
   * callCloudFunction: That add new request to the list
   */
  public addRequest(msg: string): HttpsCallable<unknown, unknown> {
    const functions = getFunctions()
    const request = httpsCallable(functions, msg);
    return request;
  }

  /**
   * signOut
   */
  public signOut(): Promise<void> {
    return signOut(this.auth);
  }
}
