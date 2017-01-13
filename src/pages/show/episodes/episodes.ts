import { Component } from '@angular/core';
import { NavParams, App, NavController, ViewController  } from 'ionic-angular';
import { EpisodeDetails } from '../../episode/episode.component';

@Component({
 templateUrl: 'episodes.html'
})
export class Episodes {
  
  
  episodes:any = {};

  constructor(public navCtrl: NavController, public app: App, navParams: NavParams, public viewCtrl: ViewController)  {
    this.episodes = navParams.data.episodes;
  }

  goToEpisode(event, episode) {
    this.app.getRootNav().push(EpisodeDetails, {
      episodeLink: episode.link
    },{
      animate: true,
      animation: 'forward'
    });
  }
}