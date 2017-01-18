import { Component } from '@angular/core';
import { NavController, NavParams, Loading,LoadingController, AlertController } from 'ionic-angular';
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
  public goBackCallback: Function;

  constructor(public navCtrl: NavController,
   public navParams: NavParams, 
   public episodeService:Episode, 
   public loadingCtrl: LoadingController,
   public alertCtrl: AlertController) {}

  ngOnInit() {
    this.goBackCallback = this.goBack.bind(this);

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
          handler: () => this.navCtrl.pop()
        }
      ]
    });
    confirm.present();
  }
}
