import { Component } from '@angular/core';
import { Catalog } from '../../providers/Catalog';
import { NavParams, LoadingController, Loading } from 'ionic-angular';
import { Show } from './show';
import { ShowService } from './show.service';
import { Details } from './details/details';
import { Episodes } from './episodes/episodes';
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
    Details,
    Episodes,
    Catalog,
    ShowService
  ]
})
export class ShowDetails {
  show: Show = {};
  loading:Loading;
  error: any;
  tab1: any = Details;
  tab2: any = Episodes;
  //tab3: any = Reviews;

  constructor(public navParams: NavParams,
   public loadingCtrl: LoadingController,
   public catalogService: Catalog,
   public showService:ShowService,
   private details:Details) {}

  ngOnInit() {
    this.loading = this.createLoader();

    this.loading.present();
    this.catalogService
      .findById('animemovil', this.navParams.get('showLink'))
      .then(show => {
        this.showService.showLoaded(show);
        this.show = show;
        this.loading.dismiss();
      })
      .catch(error =>{
        this.error = error; 
        this.loading.dismiss();
      });
  }

   createLoader() {
    return this.loadingCtrl.create({
      content: 'Loading show...'
    });
  }
}
