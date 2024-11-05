import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { 
    this.applyStyles()
  }

  applyStyles(): void {
    this.el.nativeElement.style.backgroundColor = "#89de7e"
    this.el.nativeElement.style.fontSize = "20px"
  }
}
