import { Injectable } from '@angular/core';
import { collection, DocumentData, Firestore, onSnapshot, orderBy, Query, query, QuerySnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private sortedCollection!: Query<DocumentData>;

  constructor(private firestore: Firestore) {
    // Create and initialized the collection at run time in descending order.
    // Highest number to up-vote goes to the top
    this.sortedCollection = query(collection(this.firestore, "requests"), orderBy('upvotes', 'desc'));
  }

  /**
   * requests method: gets the data in the collection and also listen for changes in the collection
   */
  public requests(cb: CallableFunction): void {
    onSnapshot(this.sortedCollection, (snapShot: QuerySnapshot<DocumentData>) => {
      cb(snapShot as QuerySnapshot<DocumentData>);
    })
  }
  
}
