import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {

  @ViewChild('div') div: any;
  constructor(private el: ElementRef<HTMLElement>) { }


  /**
   * request
   */
  public addGlobalEventListener(type: string, selector: HTMLElement, cb: CallableFunction) {
    selector.addEventListener(type, (event: Event) => {
      if (event.target === selector) {
        cb(event)
      }
    })
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    // this.el.nativeElement.classList.add('open')
    // // e.classList.add('open');
    // console.log("menu", this.menu);
    // if (this.btn2.classList.contains("add-request")) {
    //   console.log("btn", this.el.nativeElement.classList.contains("new-request"));
    //   // this.menu2.classList.add('open');
    // }

    console.log(event);
    
  }
}
