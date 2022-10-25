import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToggleDirective } from 'src/app/public/toggle.directive';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public result!: any;
  public error!: string;
  public user!: string | null;
  public show: boolean = false;
  public submitted: boolean = false
  public dis: boolean | undefined = false;

  constructor(
    private readonly auth: AuthService,
    private readonly toggle: ToggleDirective,
  ) { }

  /**
   * toggleModel
   */
  public toggleModel(e: Event) {
    if ((e.target as any).classList.contains('new-request')) {
      (e.target as any)?.classList.remove('open');
      this.dis = false
    } else {
      this.dis = true
    }
    
  }
  ngOnInit(): void {
    this.currentUser();
  }

  /**
 * signOut
 */
  public signOut() {
    this.auth.signOut().then(() => {
      this.auth.currentUser((user: User | null) => {
        this.show = false;
        if (!user && !this.show) {
          this.user = null
        }
      })
    }).catch(error => {
      alert(error.message);
    })
  }

  /**
* currentUser
*/
  private currentUser() {
    this.auth.currentUser((user: User | null) => {
      this.show = true;
      if (user && this.show) {
        this.user = user.email;
      } else {
        this.user = null;
      }
    })

  }

  /**
   * callCloudFunction:- Calling firebase callable function request handler. Instead of normal
   * https request
   */
  public addRequest(text: string): void {
    const request = this.auth.callable("request");
    request({ text }).then((result: any) => {
      this.result = result.data;
      this.dis = false;
    }).catch(error => {
      this.error = error
    })
    // this.reqForm.setValue({ text: '' });
  }

}
