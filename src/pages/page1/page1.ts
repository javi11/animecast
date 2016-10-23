import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Catalog } from '../../providers/Catalog';
import { Episode } from '../../providers/Episode';
import { Scrapper } from '../../providers/scrapper';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [
    Catalog,
    Episode,
    Scrapper
  ]
})
export class Page1 {

  constructor(public navCtrl: NavController, public catalog: Catalog, public episode: Episode) {
    this.catalog = catalog;
    this.episode = episode;
    //this.getCatalog();
    //this.getShow();
    this.getEpisode();
  }

  getCatalog() {
    this.catalog.find('animeflv', 1);
  }

  getShow() {
    this.catalog.findById('animeflv','http://animeflv.net/anime/keijo.html');
  }

  getEpisode() {
    this.episode.findById('animeflv','http://animeflv.net/ver/keijo-2.html');
  }

}
