import { Component, OnInit } from '@angular/core';
import * as functions from '@angular/fire/functions';
import { sayHello } from 'functions/src';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import https from "https-browserify";
import { User } from '@angular/fire/auth';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public result!: any;
  public error!: any;
  public user!: string
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * callCloudFunction:- Calling firebase callable function request handler. Instead of normal
   * https request
   */
  public callCloudFunction(): void {
    // functions.httpsCallable(sayHello as any, 'sayHello Function')('sayHello Function').then((result: any) => {
    //   this.result = result.data
    // }).catch(error => {
    //   this.error = error
    // })
    // const r = https.request('sayHello');
    // r.on('request', function (res: any) {console.log(res)})
    
  }
}
