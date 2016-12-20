import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
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
  catalog: Array<Show> = [];
  error: any;
  page:number = 0;
  loading: Loading;

  constructor(public navCtrl: NavController, public catalogService: Catalog, public loadingCtrl: LoadingController) {
    this.getCatalog()
      .catch(error => this.error = error);
  }

  getCatalog() {
    this.loading = this.createLoader();

    this.loading.present();
    return this.catalogService
      .find('animemovil', this.page)
      .then(newItems => {
        this.page++;
        this.loading.dismiss();
        console.log('hola', this.catalog);
        this.catalog = this.buildGallery(this.catalog, newItems, 4);
        
        return Promise.resolve();
      })
  }

  buildGallery(gallery, newItems, rowSize) {
      let row = gallery.length - 1;
      var col = 0;
      for(var i=0;i<newItems.length;i++){
        if((i % rowSize === 0 && (gallery[row] && gallery[row].length === rowSize)) || row < 0){
          row++;
          gallery[row] = [];
          col = 0;
        }

        newItems[i].position = i;

        gallery[row][col] = newItems[i];
        col++;
      }
      console.log(gallery);
      return gallery;
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
