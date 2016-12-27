import { Component } from '@angular/core';
import { Catalog } from '../../../providers/Catalog';
import { NavParams, LoadingController, Loading } from 'ionic-angular';

@Component({
 templateUrl: 'details.html',
  providers: [
    Catalog
  ]
})
export class Details {
  show: any = {};
  loading:Loading;
  error: any;

  constructor(navParams: NavParams, public loadingCtrl: LoadingController, public catalogService: Catalog) {
    const data = navParams.data;
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