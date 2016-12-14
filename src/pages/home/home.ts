import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Catalog } from '../../providers/Catalog';
import { Show } from '../../models/show';
import { Scrapper } from '../../providers/scrapper';
import { ShowDetails } from '../show/show';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    Catalog,
    Scrapper
  ]
})
export class Home {
  catalog: Array<Show>;
  error: any;

  constructor(public navCtrl: NavController, public catalogService: Catalog) {
    this.getCatalog();
  }

  getCatalog() {
    this.catalogService
      .find('animemovil', 1)
      .then(catalog => this.catalog = catalog)
      .catch(error => this.error = error);
  }

  goToShow(event, show) {
    this.navCtrl.push(ShowDetails, {
      showLink: show.link
    });
  }

}
