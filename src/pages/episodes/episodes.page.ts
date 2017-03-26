import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { NavParams, App, NavController, ViewController, Events } from 'ionic-angular';
import { PlayerPage } from '../player/player.page';
import { Subscription } from 'rxjs/Subscription';
import { ShowService } from '../show/show.service';

@Component({
  templateUrl: 'episodes.html',
  animations: [
    trigger('openClose', [
      state('collapsed, void, *',
        style({ height: '54px' })),
      state('expanded',
        style({ 'height': "150px" })),
      transition('* => expanded', [animate('500ms ease-in', style({ 'height': '150px' }))]),
      transition('expanded => collapsed', [animate('500ms ease-out', style({ 'height': '54px' }))])
    ])
  ]
})
export class EpisodesPage {
  subscription: Subscription;
  show: any = {};

  constructor(public navCtrl: NavController,
    public app: App,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public showService: ShowService,
    public events: Events) {
    this.show = navParams.data;
  }

  public ngOnInit(): void {
    // if the show is updated update the episodes to.
    this.subscription = this.showService.show$.subscribe(show => show & (this.show = show));
    this.events.subscribe('episode:updated', this.onUpdateEpisode.bind(this));
  }

  onUpdateEpisode(episode: any) {
    const episodeIndex = this.show && this.show.episodes && this.show.episodes.length > 0 && this.show.episodes.findIndex(item => String(item.link) === String(episode.id));
    episodeIndex > -1 && Object.assign(this.show.episodes[episodeIndex], episode);
  }

  goToEpisode(event, episode): void {
    this.app.getRootNav().push(PlayerPage, {
      episode,
      showLink: this.show.link
    }, {
        animate: true,
        animation: 'forward'
      });
  }

  toggleDetails(data) {
    if (!data.showDetails || data.showDetails === 'collapsed') {
      data.showDetails = 'expanded';
    } else {
      data.showDetails = 'collapsed';
    }
  }

  getEpisodePercentage(episode) {
    const duration = episode.duration,
      currentTime = episode.currentTime,
      width = duration ? {
        width: `${(currentTime / duration) * 100}%`
      } : {
          width: '0%'
        };
    return width;
  }
}