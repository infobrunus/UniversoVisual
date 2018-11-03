import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInterna]'
})
export class InternaDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}