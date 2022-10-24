import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToggleDirective } from 'src/app/toggle.directive';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  public result!: any;
  public error!: any;
  public user!: string | null;
  public show: boolean = false;
  public reqForm!: FormGroup;
  public submitted: boolean = false
  @ViewChild('btn') btn!: ElementRef<HTMLElement>;
  @ViewChild('menu') menu!: ElementRef<HTMLElement>;

  constructor(
    private readonly auth: AuthService,
    private readonly fb: FormBuilder,
    private readonly toggle: ToggleDirective,
  ) { }

  ngOnInit(): void {
    this.currentUser();
    this.reqForm = this.fb.group({
      text: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.toggle.addGlobalEventListener('click', this.btn.nativeElement, (e: Event) => {
      this.menu.nativeElement.classList.add('open');
    })

    this.toggle.addGlobalEventListener('click', this.menu.nativeElement, (event: Event) => {
      if ((event.target as any).classList.contains('new-request')) {
        this.menu.nativeElement.classList.remove('open');
      }
    })
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
  public addRequest(): void {
    const request = this.auth.addRequest("request");
    request({ ...this.reqForm.value }).then((result: any) => {
      this.result = result.data
    }).catch(error => {
      this.error = error
      console.log(error);
      
    })
    this.reqForm.setValue({ text: '' });
    if (this.menu.nativeElement.classList.contains('new-request')) {
      this.menu.nativeElement.classList.remove('open');
    }
  }

}
