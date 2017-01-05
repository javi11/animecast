import { Component, OnChanges, SimpleChange, Input } from '@angular/core';

/*
  Generated class for the Gallery component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'gallery',
  templateUrl: 'gallery.html'
})
export class Gallery implements OnChanges {
  @Input() newItems: Array<any> = [];
  @Input() rowSize: number = 4;
  @Input() public itemAction: Function; 
  items: Array<any> = [];

  constructor() {}

  buildGallery(newItems: Array<any>) {
     const initialItem = this.items.length - 1
     let row = initialItem;
     let gallery = this.items;
     let col = typeof this.items[initialItem] === 'object' ? this.items[initialItem].length: 0;
     for(let i=0;i<newItems.length;i++){
       if(row < 0 || col === this.rowSize || (i % this.rowSize === 0 && col === this.rowSize)){
         row++;
         gallery[row] = [];
         col = 0;
       }
       gallery[row][col] = newItems[i];
       col++;
     }
     this.items = gallery;
 }

 ngOnChanges(changes: { [propName: string]: SimpleChange }) {
   this.buildGallery(changes['newItems'] && changes['newItems'].currentValue);
 }

}
