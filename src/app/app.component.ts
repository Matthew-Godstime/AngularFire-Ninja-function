import { Component, OnInit, } from '@angular/core';
import { ToggleDirective } from './toggle.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToggleDirective]
})
export class AppComponent implements OnInit {

  title = 'ninja-firebase-function';

  constructor() { }

  ngOnInit(): void {

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
