import { Component } from '@angular/core';
import { Catalog } from '../../providers/Catalog';
import { NavParams, LoadingController, Loading, ToastController, Toast } from 'ionic-angular';
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
  error:Toast;
  tab1: any = Details;
  tab2: any = Episodes;
  //tab3: any = Reviews;

  constructor(public navParams: NavParams,
   public loadingCtrl: LoadingController,
   public catalogService: Catalog,
   public showService:ShowService,
   private details:Details, 
   public toastCtrl: ToastController) {}

  ngOnInit() {
    this.getShow()
      .catch(this.handleError.bind(this));
  }

  getShow():Promise<any> {
    this.loading = this.createLoader();

    this.loading.present();
    return this.catalogService
      .findById('animemovil', this.navParams.get('showLink'))
      .then(show => {
        this.showService.showLoaded(show);
        this.show = show;
        this.loading.dismiss();
      });
  }

  createLoader() {
    return this.loadingCtrl.create({
      content: 'Loading show...'
    });
  }

  handleError(message: any):void {
    this.loading.dismiss();
    this.error = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      closeButtonText: 'Try again',
      showCloseButton: true
    });

    this.error.onDidDismiss(()=> {
      this.getShow()
      .catch(this.handleError.bind(this));
    });

    this.error.present();
  }
}
