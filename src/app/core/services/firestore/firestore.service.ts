import { Injectable } from '@angular/core';
import { ref } from '@angular/fire/database';
import { collection, CollectionReference, DocumentData, Firestore, onSnapshot, QuerySnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private requestCollection!: CollectionReference<DocumentData>;
  constructor(private firestore: Firestore) { 
    this.requestCollection = collection(this.firestore, "requests");
  }

  /**
   * requests method: gets the data in the collection and also listen for changes in the collection
   */
  public requests(cb: CallableFunction): void {
    onSnapshot(this.requestCollection, (snapShot: QuerySnapshot<DocumentData>) => {
      cb(snapShot as QuerySnapshot<DocumentData>);
    })
  }
  
}
