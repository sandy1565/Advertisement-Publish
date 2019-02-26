import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appToggler]'
})
export class TogglerDirective {
  @HostListener('click') onclick(){
    (document.querySelector('.navPanelToggle') as any).click();
  }
  constructor() { }

}
