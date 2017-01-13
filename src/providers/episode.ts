import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
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

  constructor(public http: Http, public helpers:ProvidersHelpers) {}

  findById(host: string, url: string) : Promise <any> {
    let scrapper;
    let isHtml:boolean = false;

    return this.helpers.getPlugin(host)
      .then(plugin => {
          if(plugin.catalog.scrapper) {
            scrapper = new Scrapper();
            isHtml = true;
          } else {
            scrapper =new ApiMapping();
          }
          scrapper.setPlugin(plugin.catalog);
        return this.http
          .get(`${plugin.url}${url}`)
          .toPromise();
      })
      .then(data => {
          let result = [];
          result = isHtml? scrapper.startScrappe(data['_body']) : scrapper.startMapping(data.json());
          return result;
      })
      .catch(_.curry(this.helpers.handleError)('Can\'t get the episode'));
  }
}
