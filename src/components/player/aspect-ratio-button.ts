import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

/*
  Generated class for the AspectRatioButton component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'aspect-ratio-button',
  encapsulation: ViewEncapsulation.None,
  template: `<div class="item buttom" (click)="changeAspectRatio($event)">
  <ion-icon name="expand"></ion-icon>
</div>`
})
export class AspectRatioButton {

  text: string;
  aspectRatios:Array<string> = ['contain','fill','cover','scale-down'];
  selectedAspectRatio:number = 0;
  @Output() onSelectAspectRatio: EventEmitter<any> = new EventEmitter();

  constructor() {}

  changeAspectRatio() {
    if(this.selectedAspectRatio === this.aspectRatios.length-1) {
      this.selectedAspectRatio = 0;
    } else {
      this.selectedAspectRatio = this.selectedAspectRatio + 1;
    }
    this.onSelectAspectRatio.emit(this.aspectRatios[this.selectedAspectRatio]);
  }

}
