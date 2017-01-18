import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { NavParams, App, NavController, ViewController  } from 'ionic-angular';
import { EpisodeDetails } from '../../episode/episode.component';
import { Subscription }   from 'rxjs/Subscription';
import { ShowService } from '../show.service';

@Component({
 templateUrl: 'episodes.html',
 animations: [
        trigger('openClose', [
            state('collapsed, void',
                style({ height: '48px', })),
            state('expanded',
                style({ 'height': "*" })),
            transition(
            'collapsed => expanded', [animate('500ms ease-in', style({'height': '150px'})), animate('500ms ease-in')]),
           transition(
            'expanded => collapsed', [animate('500ms ease-out', style({'height': '48px'})), animate('500ms ease-out')])
        ])
    ]
})
export class Episodes {
  subscription: Subscription; 
  episodes:any = {};

  constructor(public navCtrl: NavController, public app: App, navParams: NavParams, public viewCtrl: ViewController, public showService:ShowService)  {
    this.episodes = navParams.data.episodes;
  }

  public ngOnInit():void {
    // if the show is updated update the episodes to.
    this.subscription = this.showService.show$.subscribe(show => show & (this.episodes = show.episodes.map(episode=>{
      episode.showDetails = 'collapsed';
      return episode;
    })));
  }

  goToEpisode(event, episode):void {
    this.app.getRootNav().push(EpisodeDetails, {
      episodeLink: episode.link
    },{
      animate: true,
      animation: 'forward'
    });
  }

  toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = 'expanded';
    } else {
        data.showDetails = 'collapsed';
    }
  }
}