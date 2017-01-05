import { Component } from '@angular/core';
import { NavParams} from 'ionic-angular';

@Component({
 templateUrl: 'episodes.html'
})
export class Episodes {
  episodes:any = {};

  constructor(navParams: NavParams)  {
    this.episodes = navParams.data.episodes;
  }
}