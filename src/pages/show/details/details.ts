import { Component, Input } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { ShowService } from '../show.service';
import { Show } from '../show';

@Component({
 templateUrl: 'details.html'
})
export class Details{
  @Input() show:Show = {};
  subscription: Subscription;

  constructor(public showService:ShowService)  {
    this.subscription = this.showService.show$.subscribe(show => this.show = show);
  }
}