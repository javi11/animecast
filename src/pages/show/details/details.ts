import { Component } from '@angular/core';
import { ShowService } from '../show-service';
import { Observable } from 'rxjs/Observable';

@Component({
 templateUrl: 'details.html',
 providers: [ShowService]
})
export class Details  {
  show:Observable<any>;

  constructor(public showService:ShowService) {}

  ngOnInit() {
    this.show = this.showService.show;
  }

}