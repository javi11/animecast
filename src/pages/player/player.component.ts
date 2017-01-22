import { Component } from '@angular/core';
import { NavController, NavParams, Loading,LoadingController, AlertController } from 'ionic-angular';
import { Episode } from '../../providers/Episode';
import { EpisodeService } from '../../pages/show/episodes/episodes.service';
import {VgAPI} from 'videogular2/core';
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
  sources:any = []

  constructor(public navCtrl: NavController,
   public navParams: NavParams, 
   public episodeProvider:Episode, 
   public loadingCtrl: LoadingController,
   public alertCtrl: AlertController,
   public episodeService:EpisodeService ) {}

   ngOnInit() {
    this.loading = this.createLoader();
    this.loading.present();
    this.episodeProvider
      .findById('animemovil', this.navParams.get('episodeLink'))
      .then(episode => {
        this.episode = episode;
        this.selectDefaultOption(episode);  
        this.loading.dismiss();
      })
      .catch(error =>{
        this.error = error; 
        this.loading.dismiss();
      });
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

  onPlayerReady(api:VgAPI) {
    this.videoAngular2Api = api;
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
            const mediaData = this.getMediaData();
            this.episodeService.updateEpisodeStatus(this.navParams.get('showLink'), mediaData).then(() => {
              this.navCtrl.pop();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  private getMediaData():any {
    let mediaData = {};
    if(this.videoAngular2Api) {
      const time = this.videoAngular2Api.time;
      mediaData = {
        currentTime: time.current,
        duration: time.total,
        id: this.navParams.get('episodeLink')
      };
    }
    return mediaData;
  }

}
