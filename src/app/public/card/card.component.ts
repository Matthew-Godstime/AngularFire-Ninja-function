import { Component, OnInit } from '@angular/core';
import { QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/core/services/firestore/firestore.service';
import { ReqData } from './reqData';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  public requests: ReqData[] = [];
  constructor(private readonly firestore: FirestoreService) { }

  ngOnInit(): void {
    this.firestore.requests((snapshots: QuerySnapshot<DocumentData>) => {
      const requests: ReqData[] = [];
      snapshots.forEach(docs => {
        requests.push({ ...docs.data(), id: docs.id } as ReqData);
      })
      this.requests = requests;
    })
  }

}
