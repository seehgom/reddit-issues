import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {

  @Input() appFocus: boolean = false;
  constructor(private hostElement: ElementRef) { }

  ngOnChanges() {
    if(this.appFocus) {
      this.hostElement.nativeElement.focus();
    }
  }

}
