import { Component } from '@angular/core';
import { NavController, NavParams, Loading,LoadingController, AlertController, Platform } from 'ionic-angular';
import { Episode } from '../../providers/Episode';
import { EpisodeService } from '../../pages/show/episodes/episodes.service';
import {VgAPI} from 'videogular2/core';
import { ScreenOrientation,  } from 'ionic-native';
import { ConfigProvider } from '../../config/config.provider';

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
  ]
})
export class PlayerComponent {
  episode:any = {};
  options:any = [];
  loading:Loading;
  error: any;
  videoAngular2Api:VgAPI;
  sources:any = [];
  updating:boolean = false;

  constructor(public navCtrl: NavController,
   public navParams: NavParams, 
   public episodeProvider:Episode, 
   public loadingCtrl: LoadingController,
   public alertCtrl: AlertController,
   public episodeService:EpisodeService,
   public platform:Platform,
   public config:ConfigProvider) {}

   ngOnInit() {
    this.platform.ready().then(() => !this.platform.is('core') && ScreenOrientation.lockOrientation('landscape'));

    this.loading = this.createLoader();
    this.loading.present();
    this.config.get().then(config => this.episodeProvider
      .findById(config.provider, this.navParams.get('episode').link)
      .then(episode => {
        this.episode = Object.assign(episode, this.navParams.get('episode'));
        this.selectDefaultOption(episode);  
        this.loading.dismiss();
      })
      .catch(error =>{
        this.error = error; 
        this.loading.dismiss();
    }));
  }

  ngOnDestroy() {
    this.platform.ready().then(() => !this.platform.is('core') && ScreenOrientation.lockOrientation('portrait'));
  }

  selectDefaultOption(episode:any) {
    const options = episode.options;
    options && options.length > 0 && (this.sources = [{
      src: options[0].streamLink,
      type: 'video/mp4',
      thumb: options[0].thumb
    }]);
    console.log(this.sources);
  }

  createLoader() {
    return this.loadingCtrl.create({
      content: 'Loading episode...'
    });
  }

  seekVideo():void {
    // Set the video to the beginning
      var video = this.videoAngular2Api.videogularElement;
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    this.videoAngular2Api.getDefaultMedia().currentTime = this.episode.currentTime || 0;
  }

  onPause():void {
    const mediaData = this.getMediaData();
    this.updating = true;
    this.episodeService.updateEpisodeStatus(this.navParams.get('showLink'), mediaData).then(() => this.updating = false);
  }

  onPlayerReady(api:VgAPI) {
    this.videoAngular2Api = api;
    this.videoAngular2Api.getDefaultMedia().subscriptions.loadStart.subscribe(this.seekVideo.bind(this));
    this.videoAngular2Api.getDefaultMedia().subscriptions.pause.subscribe(this.onPause.bind(this));
  }

  goBack() {
    let confirm = this.alertCtrl.create({
      title: 'Caution!',
      message: 'Are you sure you want to stop the video?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
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

  private getMediaData():any {
    let mediaData = {};
    if(this.videoAngular2Api) {
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
