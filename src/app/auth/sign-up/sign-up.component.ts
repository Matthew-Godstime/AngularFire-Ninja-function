import { Component, OnInit } from '@angular/core';
import { sendEmailVerification, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormData } from 'src/app/core/model/FormData';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public error!: string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * register
   */
  public register({email, password}: FormData) {
    this.auth.register({ email, password }).then((res: UserCredential) => {
      alert("We've sent a verification mail");
      sendEmailVerification(res.user, { url: 'http://localhost:4200' }).then(() => {
        this.router.navigateByUrl('/');
      })
    }).catch(error => {
      this.error = error.message;
    })
  }
}
