import { Component } from '@angular/core';
import { NavController, NavParams, Loading,LoadingController } from 'ionic-angular';
import { Episode } from '../../providers/Episode';

/*
  Generated class for the Episode page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'episode',
  templateUrl: 'episode.html',
  providers: [
    Episode
  ]
})
export class EpisodeDetails {
  episode:any = {};
  options:any = [];
  loading:Loading;
  error: any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams, 
   public episodeService:Episode, 
   public loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.loading = this.createLoader();

    this.loading.present();
    this.episodeService
      .findById('animemovil', this.navParams.get('episodeLink'))
      .then(episode => {
        this.episode = episode;
        this.options = this.episode.options;
        this.loading.dismiss();
      })
      .catch(error =>{
        this.error = error; 
        this.loading.dismiss();
      });
  }

   createLoader() {
    return this.loadingCtrl.create({
      content: 'Loading episode...'
    });
  }
}
