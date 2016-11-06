import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Izanagi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Izanagi {
  constructor(public http: Http) {}
  
  setStreamLink(episode: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(episode.streamLink)
        .map(res => res.json())
        .subscribe(item => {
          episode.streamLink = item.file.replace('\\','');
          resolve(episode);
        },
        err => reject(err));
    });
  }

}
