import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Details } from './details/details';
//import { Reviews } from './reviews';
import { Episodes } from './episodes/episodes';

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
      <ion-tab tabIcon="information-circle" tabTitle="Details" [root]="tab1" [rootParams]="data"></ion-tab>
      <ion-tab tabIcon="information-circle" tabTitle="Episodes" [root]="tab2" [rootParams]="data"></ion-tab>
    </ion-tabs>`,
  providers: [
    Details,
    Episodes
  ]
})
export class ShowDetails {
  data: any;
  tab1: any = Details;
  tab2: any = Episodes;
  //tab3: any = Reviews;

  constructor(public navParams: NavParams) {
    this.data = {
      showLink: navParams.get('showLink'),
      server: 'animemovil'
    };
  }
}
