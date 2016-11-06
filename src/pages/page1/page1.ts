import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Catalog } from '../../providers/Catalog';
import { Show } from '../../models/show';
import { Episode } from '../../providers/Episode';
import { Scrapper } from '../../providers/scrapper';
import { Izanagi } from '../../providers/servers/izanagi';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [
    Catalog,
    Episode,
    Scrapper,
    Izanagi
  ]
})
export class Page1 {
  episode: any;
  catalog: Array<Show>;
  show: Show;
  error: any;

  constructor(public navCtrl: NavController, public catalogService: Catalog, public episodeService: Episode) {
    this.catalogService = catalogService;
    this.episodeService = episodeService;
    this.getCatalog();
    this.getShow();
    this.getEpisode();
  }

  getCatalog() {
    this.catalogService
      .find('animeflv', 1)
      .then(catalog => this.catalog = catalog)
      .catch(error => this.error = error);
  }

  getShow() {
    this.catalogService
      .findById('animeflv','http://animeflv.net/anime/keijo.html')
      .then(show => this.show = show)
      .catch(error => this.error = error);
  }

  getEpisode(): void {
    this.episodeService
      .findById('animeflv','http://animeflv.net/ver/keijo-2.html')
      .then(episode => this.episode = episode)
      .catch(error => this.error = error);
  }

}
