import { Directive, OnInit, EventEmitter, ElementRef, Input, Output } from '@angular/core';

@Directive({
  selector: '[appSlimScroll]'
})
export class SlimScrollDirective implements OnInit {
  @Input() appSlimScroll;
  @Output() scrollEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  $slimScrollObj: any;

  constructor(private elm: ElementRef) { }

  ngOnInit() {
    this.$el = jQuery(this.elm.nativeElement);
    this.$slimScrollObj = this.$el.slimScroll(this.appSlimScroll); // criar slimScroll

    // binda evento se possuir observadores
    if (this.scrollEvent.observers.length > 0) {
      const self = this; // expõe this para o evento jQuery

      this.$slimScrollObj.on('slimscroll', function (e, pos) {
        self.scrollEvent.emit(pos);
      });
    }
  }
}
