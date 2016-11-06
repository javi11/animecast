import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Scrapper } from './scrapper';
import { Izanagi } from './servers/izanagi';

/*
  Generated class for the Episode provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Episode {

  constructor(public http: Http) {}

  findById(host: string, url: string) : Promise <any> {
    let scrapper;

    return this.http
      .get(`assets/plugins/${host}.json`)
      .map(res => res.json())
      .toPromise()
      .then(plugin => {
        scrapper = new Scrapper();
        scrapper.setPlugin(plugin.episode);

        return this.http
          .get(url)
          .toPromise();
      })
      .then(html => {
            let episode:any = scrapper.startScrappe(html['_body']);
            if(episode) {
              episode = episode[0];
              /* Especial modifications especific for every plugin */
              if(scrapper.getPlugin().modifications.length > 0) {
                scrapper.getPlugin().episode.modifications.forEach(modification => {
                  episode[modification.from] = this.modificationList(modification, episode[modification.from]);
                });
              }
              return this.addStreamLink(episode);
            }
      })
      .catch(this.handleError);
  }

  addStreamLink(episode: any) {
      let result = Promise.resolve(episode);

      switch (true) {
        case (episode.streamLink.indexOf('izanagi') > -1):
          let izanagi = new Izanagi(this.http);
          result = izanagi.setStreamLink(episode);
          break;
      }

      return result;
  }

  modificationList(modification: any, value: string) {
    let result:any = value;
    switch(modification.action) {
      case 'remove':
        result = value.replace(modification.what,'');
      break;
      case 'replace':
        result = value.replace(modification.what, modification.for);
      break;
      case 'urlDecode':
        result = decodeURIComponent(value);
      break;
      case 'prepend':
        result = `${modification.what}${value}`;
      break;
    }
    return result;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
