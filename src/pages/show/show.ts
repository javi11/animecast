import { Component } from '@angular/core';
import { Catalog } from '../../providers/Catalog';
import { Scrapper } from '../../providers/scrapper';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public catalogService: Catalog) {
    // If we navigated to this page, we will have an item available as a nav param
    const showLink = navParams.get('showLink');
    catalogService
      .findById('animemovil', showLink)
      .then(show => this.show = show)
      .catch(error => this.error = error);
  }
}
