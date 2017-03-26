import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ShowService } from '../show/show.service';
import { Show } from '../show/show';

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage {
  @Input() show: Show = {};
  subscription: Subscription;

  constructor(public showService: ShowService) {
    this.subscription = this.showService.show$.subscribe(show => this.show = show);
  }
}