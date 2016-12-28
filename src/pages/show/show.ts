import { Component } from '@angular/core';
import { Catalog } from '../../providers/Catalog';
import { NavParams, LoadingController, Loading } from 'ionic-angular';
import { Details } from './details/details';
//import { Reviews } from './reviews';
//import { Episodes } from './episodes/episodes';

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
      </ion-navbar>
    </ion-header>
    <ion-tabs>
      <ion-tab tabIcon="information-circle" tabTitle="Details" [root]="tab1" [show]="show"></ion-tab>
    </ion-tabs>`,
  providers: [
    Catalog,
    Details
  ]
})
export class ShowDetails {
  show: any = {};
  loading:Loading;
  error: any;
  tab1: any = Details;
  //tab2: any = Episodes;
  //tab3: any = Reviews;

  constructor(public navParams: NavParams, public loadingCtrl: LoadingController, public catalogService: Catalog) {
    const data = {
      showLink: navParams.get('showLink'),
      server: 'animemovil'
    };
    this.loading = this.createLoader();

    this.loading.present();
    catalogService
      .findById(data.server, data.showLink)
      .then(show => {
        this.show = show;
        console.log('Show -->', show);
        this.loading.dismiss();
      })
      .catch(error =>{
        this.error = error; 
        this.loading.dismiss();
      });
  }

   createLoader() {
    return this.loadingCtrl.create({
      content: 'Loading data...'
    });
  }
}
