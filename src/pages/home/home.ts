import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { Catalog } from '../../providers/Catalog';
import { Scrapper } from '../../providers/scrapper';
import { ShowDetails } from '../show/show.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    Catalog,
    Scrapper
  ]
})
export class Home {
  newItems: Array<any> = [];
  error: any;
  page:number = 0;
  loading: Loading;
  public goToShowCallback: Function;

  constructor(public navCtrl: NavController, public catalogService: Catalog, public loadingCtrl: LoadingController) {
    this.getCatalog()
      .catch(error => this.error = error);
  }

  public ngOnInit(){
    this.goToShowCallback = this.goToShow.bind(this);
  }

  getCatalog() {
    this.loading = this.createLoader();

    this.loading.present();
    return this.catalogService
      .find('animemovil', this.page)
      .then(newItems => {
        this.page++;
        this.loading.dismiss();
        this.newItems = newItems;
        return Promise.resolve();
      })
  }

  goToShow(event, show) {
    this.navCtrl.push(ShowDetails, {
      showLink: show.link
    });
  }

  loadMore(infiniteScroll) {
    this.getCatalog()
      .then(() => infiniteScroll.complete())
      .catch(error => {
        this.error = error;
        infiniteScroll.complete();
      });       
  }

  createLoader() {
    return this.loadingCtrl.create({
      content: 'Loading data...'
    });
  }
}
