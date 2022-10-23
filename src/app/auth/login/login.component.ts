import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormData } from 'src/app/core/model/FormData';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error!: string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * login a user
   */
  public login(formData: FormData) {
    this.auth.logIn(formData).then(() => {
      this.router.navigateByUrl("/");
    }).catch(error => {
      this.error = error.message;
    })
  }
}
