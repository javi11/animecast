import { Component } from '@angular/core';
import { Catalog } from '../../providers/Catalog';
import { Scrapper } from '../../providers/scrapper';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

@Component({
  selector: 'page-page2',
  templateUrl: 'show.html',
  providers: [
    Catalog,
    Scrapper
  ]
})
export class ShowDetails {
  show: any = {};
  error: any;
  loading:Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public catalogService: Catalog, public loadingCtrl: LoadingController) {
    this.loading = this.createLoader();

    const showLink = navParams.get('showLink');
    this.loading.present();
    catalogService
      .findById('animemovil', showLink)
      .then(show => {
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
      content: 'Loading data...'
    });
  }
}
