import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Scrapper } from './scrapper';
import 'rxjs/add/operator/map';

/*
  Generated class for the Episode provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Episode {

  public episode: any;

  constructor(public http: Http, public scrapper: Scrapper) {
    this.http = http;
    this.scrapper = scrapper;
  }

  findById(host, url) {
    this.http
      .get(`assets/plugins/${host}.json`)
      .map(res => res.json())
      .subscribe(plugin => {
        if (!plugin) {
          console.error(`${plugin} not found`);
          return;
        };

        this.http
          .get(url).subscribe(
          html => {
            this.episode = this.scrapper.scrappe(html['_body'], plugin.episode);
            if(this.episode) {
              this.episode = this.episode[0];
              /* Especial modifications especific for every plugin */
              if(plugin.episode.modifications.length > 0) {
                plugin.episode.modifications.forEach(modification => {
                  this.episode[modification.from] = this.modificationList(modification, this.episode[modification.from]);
                });
              }
              console.log(this.episode);
            }
          },
          err => console.error(err));
      },
      err => console.error(err));
  }

  modificationList(modification, value) {
    let result:any = value;
    switch(modification.action) {
      case 'remove':
        result = value.replace(modification.what,'');
      break;
      case 'replace':
        result = value.replace(modification.what, modification.with);
      break;
      case 'urlDecode':
        result = decodeURIComponent(value);
      break;
    }
    return result;
  }

}
