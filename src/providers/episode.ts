import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Scrapper } from './scrapper';
import { ProvidersHelpers } from './helpers';
import { ApiMapping } from './api-mapping';
import _ from 'lodash';

/*
  Generated class for the Episode provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Episode {

  constructor(public http: Http, public helpers: ProvidersHelpers) { }

  findById(host: string, url: string): Promise<any> {
    let scrapper;
    let isHtml: boolean = false;

    return this.helpers.getPlugin(host)
      .then(plugin => {
        if (plugin.episode.scrapper) {
          scrapper = new Scrapper();
          isHtml = true;
        } else {
          scrapper = new ApiMapping();
        }
        scrapper.setPlugin(plugin.episode);
        let headers = new Headers({ 'X-Requested-With': 'XMLHttpRequest' });
        let options = new RequestOptions({ headers: headers });

        return this.http
          .get(`${plugin.url}${url}`, options)
          .toPromise();
      })
      .then(data => {
        let result = isHtml ? scrapper.startScrappe(data['_body']) : scrapper.startMapping(data.json());
        return result && result[0] ? result[0] : this.helpers.handleError('Can\'t get the episode', {
          developerMessage: `${url} can't be scrapped`,
          code: '500'
        });
      })
      .catch(_.curry(this.helpers.handleError)('Can\'t get the episode'));
  }
}
