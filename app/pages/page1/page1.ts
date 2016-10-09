import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Shows } from '../../providers/shows/shows';
import { Plugins } from '../../providers/plugins/index';
import { Animeflv } from '../../providers/plugins/animeflv';

@Component({
  templateUrl: 'build/pages/page1/page1.html',
   providers: [Shows]
})
export class Page1 {

  constructor(public navCtrl: NavController, shows: Shows) {
    shows.find('animeflv').then((result) => {
      console.log(result);
    })
    
  }
}
