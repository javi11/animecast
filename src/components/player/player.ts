import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

/*
  Generated class for the Player component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'player',
  templateUrl: 'player.html'
})
export class PlayerComponent implements OnChanges {
  @Input() options: Array<any> = [];
  @Input() public goBackAction: Function; 
  
  sources:any = []

  constructor() {}

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this.options = changes['options'] && changes['options'].currentValue;
    this.options && this.options.length > 0 && (this.sources = [{
      src: this.options[0].streamLink,
      type: 'video/mp4',
      thumb: this.options[0].thumb
    }]);
    console.log(this.sources);
  }
}
