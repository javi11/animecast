import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Episode } from '../../providers/Episode';
import { EpisodeService } from '../episodes/episodes.service';
import { VgAPI } from 'videogular2/core';
import { ScreenOrientation, } from 'ionic-native';
import { ConfigProvider } from '../../config/config.provider';

declare var AndroidFullScreen: any;

/*
  Generated class for the Player component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'player',
  templateUrl: 'player.html',
  providers: [
    Episode,
    EpisodeService
  ],
  animations: [
    trigger('visibility', [
      state('shown', style({
        display: 'flex',
        opacity: 1,
        cursor: 'auto'
      })),
      state('hidden', style({
        display: 'none',
        opacity: 0,
        cursor: 'none'
      })),
      transition('* => *', animate('.5s'))
    ])
  ]
})
export class PlayerPage {
  episode: any = {};
  options: any = [];
  loading: Loading;
  error: any;
  videoAngular2Api: VgAPI;
  sources: any = [];
  subtitules: any = [];
  updating: boolean = false;

  // Player controls
  controlsVisible: string = 'shown';
  hideTimeout: number = 3000;
  inactivityTimeout: any;
  autoHide: boolean = true;
  aspectRatio = 'contain';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public episodeProvider: Episode,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public episodeService: EpisodeService,
    public platform: Platform,
    public config: ConfigProvider) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      if (!this.platform.is('core')) {
        ScreenOrientation.lockOrientation('landscape');
        AndroidFullScreen.immersiveMode(() => { }, (error) => this.error = error);
      }
    });

    this.loading = this.createLoader();
    this.loading.present();
    this.config.get().then(config => this.episodeProvider
      .findById(config.provider, this.navParams.get('episode').link)
      .then(episode => {
        this.episode = Object.assign(episode, this.navParams.get('episode'));
        console.log('episode -->', this.episode);
        this.selectDefaultOption(episode);
        this.loading.dismiss();
      })
      .catch(error => {
        this.error = error;
        this.loading.dismiss();
      }));
  }

  ngOnDestroy() {
    if (!this.platform.is('core')) {
      ScreenOrientation.lockOrientation('portrait');
      AndroidFullScreen.showSystemUI(() => { }, (error) => this.error = error);
    }
  }

  showControls() {
    this.controlsVisible = 'shown';
    this.autoHide && this.hideControls();
  }

  hideControls(): void {
    this.inactivityTimeout && clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      this.controlsVisible = 'hidden';
    }, this.hideTimeout);
  }

  selectDefaultOption(episode: any) {
    const options = episode.options;
    if (options && options.length > 0) {
      this.sources = options.map((option) => {
        return {
          src: option.streamLink,
          type: option.type || 'video/mp4',
          thumb: option.thumb
        }
      });
    } else {
      this.sources = [{
        src: episode.streamLink,
        type: 'video/mp4',
        thumb: episode.thumb
      }];
    }

    if (episode.subtitules) {
      this.subtitules = episode.subtitules.map((subtitule) => {
        return {
          src: subtitule.src,
          label: subtitule.label,
          language: subtitule.language
        }
      });
    }
  }

  createLoader() {
    return this.loadingCtrl.create({
      content: 'Loading episode...'
    });
  }

  changueAspectRatio(aspectRatio): void {
    this.aspectRatio = aspectRatio;
  }

  seekVideo(): void {
    this.videoAngular2Api.getDefaultMedia().currentTime = this.episode.currentTime || 0;
  }

  onPause(): void {
    // keep visible the controls
    this.inactivityTimeout && clearTimeout(this.inactivityTimeout);
    this.controlsVisible = 'shown';
    if (!this.updating) {
      const mediaData = this.getMediaData();
      this.updating = true;
      this.episodeService.updateEpisodeStatus(this.navParams.get('showLink'), mediaData).then(() => this.updating = false);
    }
  }

  onPlayerReady(api: VgAPI) {
    this.videoAngular2Api = api;
    this.videoAngular2Api.getDefaultMedia().subscriptions.loadStart.subscribe(this.seekVideo.bind(this));
    this.videoAngular2Api.getDefaultMedia().subscriptions.pause.subscribe(this.onPause.bind(this));
    this.autoHide && this.videoAngular2Api.getDefaultMedia().subscriptions.play.subscribe(this.hideControls.bind(this));
  }

  goBack() {
    let confirm = this.alertCtrl.create({
      title: 'Caution!',
      message: 'Are you sure you want to stop the video?',
      buttons: [
        {
          text: 'No',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.videoAngular2Api && this.videoAngular2Api.pause();
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  private getMediaData(): any {
    let mediaData = {};
    if (this.videoAngular2Api) {
      const time = this.videoAngular2Api.getDefaultMedia();
      mediaData = {
        currentTime: time.currentTime,
        duration: time.duration,
        id: this.episode.link
      };
    }
    return mediaData;
  }

}
