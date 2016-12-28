import { Component, OnChanges, SimpleChange } from '@angular/core';

@Component({
 templateUrl: 'details.html'
})
export class Details implements OnChanges {
  show: any = {};

  constructor() {}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log(changes);
  }

}