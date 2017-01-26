import { Component } from '@angular/core';
import { Catalog } from '../../providers/Catalog';
import { NavParams, LoadingController, Loading, ToastController, Toast } from 'ionic-angular';
import { Show } from './show';
import { ShowService } from './show.service';
import { EpisodeService } from './episodes/episodes.service';
import { DetailsComponent } from './details/details.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { ConfigProvider } from '../../config/config.provider';
//import { Reviews } from './reviews';

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>{{show.title}}</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-tabs>
      <ion-tab tabIcon="information-circle" tabTitle="Details" [root]="tab1"></ion-tab>
      <ion-tab tabIcon="desktop" tabTitle="Episodes" [root]="tab2" [rootParams]="show"></ion-tab>
    </ion-tabs>`,
  providers: [
    DetailsComponent,
    EpisodesComponent,
    Catalog,
    ShowService,
    EpisodeService
  ]
})
export class ShowDetails {
  show: Show = {};
  loading:Loading;
  error:Toast;
  tab1: any = DetailsComponent;
  tab2: any = EpisodesComponent;
  //tab3: any = Reviews;

  constructor(public navParams: NavParams,
   public loadingCtrl: LoadingController,
   public catalogService: Catalog,
   public showService:ShowService,
   public episodeService:EpisodeService,
   private details:DetailsComponent, 
   public toastCtrl: ToastController,
    public config:ConfigProvider) {}

  ngOnInit() {
    this.getShow()
      .catch(this.handleError.bind(this));
  }

  getShow():Promise<any> {
    this.loading = this.createLoader();

    this.loading.present();
    return this.config.get().then(config => this.catalogService
      .findById(config.provider, this.navParams.get('showLink'))
      .then(this.populateEpisodeData.bind(this))
      .then(show => {
        this.show = show;
        this.show.link = this.navParams.get('showLink');
        this.showService.showLoaded(this.show);
        this.loading.dismiss();
    }));
  }

  populateEpisodeData(show): Promise<Show>{
    return new Promise((resolve, reject) => {
      if(show.episodes && show.episodes.length > 0) {
        return this.episodeService.getEpisodes(this.navParams.get('showLink')).then(episodes => {
          episodes && episodes.length > 0 && episodes.forEach(episode => {
            const episodeIndex = show.episodes.findIndex(item => item.link === episode.id);
            Object.assign(show.episodes[episodeIndex], episode);
          });
          resolve(show);
        });
      } else {
        return resolve(show);
      }
    });
  }

  createLoader() {
    return this.loadingCtrl.create({
      content: 'Loading show...'
    });
  }

  handleError(message: any):void {
    this.loading.dismiss();
    this.error = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      closeButtonText: 'Try again',
      showCloseButton: true
    });

    this.error.onDidDismiss(()=> {
      this.getShow()
      .catch(this.handleError.bind(this));
    });

    this.error.present();
  }
}
