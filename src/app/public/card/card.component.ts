import { Component, OnInit } from '@angular/core';
import { QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { interval, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/firestore/firestore.service';
import { ReqData } from './reqData';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  public requests: ReqData[] = [];
  public error!: string | null;

  constructor(
    private readonly firestore: FirestoreService,
    private readonly auth: AuthService
  ) { }

  ngOnInit(): void {
    this.firestore.requests((snapshots: QuerySnapshot<DocumentData>) => {
      const requests: ReqData[] = [];
      snapshots.forEach(docs => {
        requests.push({ ...docs.data(), id: docs.id } as ReqData);
      })
      this.requests = requests;
    })
  }

  /**
   * upVoteRequest method: Send's a callable request to up-vote the given tutorial
   */
  public upVoteRequest(reqId: string) {
    const upvote = this.auth.callable("upvote");
    upvote({ reqId }).catch(error => {
      this.error = error.message;
      // Toggle the error notification
      interval(1000).pipe(take(4)).subscribe({
        complete: () => {
          this.error = null;
        },
        next(value) {
          console.log(value);

        },
      })
    });
  }

}
