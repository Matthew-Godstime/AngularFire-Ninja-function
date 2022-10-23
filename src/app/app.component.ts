import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from './core/services/auth/auth.service';
import { ToggleDirective } from './toggle.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToggleDirective]
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'ninja-firebase-function';
  
  @ViewChild('btn') btn!: ElementRef<HTMLElement>;
  @ViewChild('menu') menu!: ElementRef<HTMLElement>;
  public user!: string | null;
  public show: boolean = false;

  constructor(private toggle: ToggleDirective, private auth: AuthService) { }


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


  ngOnInit(): void {
    this.currentUser();
    // const requestModal = document.querySelector('.new-request');
    // const requestLink = document.querySelector('.add-request');

    // // open request modal
    // requestLink?.addEventListener('click', () => {
    //   requestModal?.classList.add('open');
    // });

    // // close request modal
    // requestModal?.addEventListener('click', (e) => {
    //   if ((e.target as any).classList.contains('new-request')) {
    //     requestModal.classList.remove('open');
    //   }
    // });
  }

}
