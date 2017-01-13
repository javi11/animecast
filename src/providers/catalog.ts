import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Scrapper } from './scrapper';
import { ApiMapping } from './api-mapping';
import { Show } from '../pages/show/show';
import { ProvidersHelpers } from './helpers';
import _ from 'lodash';

/*
  Generated class for the Catalog provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Catalog {

  constructor(public http: Http, public helpers:ProvidersHelpers) {}

  find(host: string, page: number): Promise<Array<Show>> {
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
            .get(`${plugin.catalog.url}?${plugin.catalog.pagination}=${page}${plugin.catalog.extrUrlParameters}`)
            .toPromise();
        })
        .then(data => {
          let result = [];
          result = isHtml? scrapper.startScrappe(data['_body']) : scrapper.startMapping(data.json());
          return result;
        })
        .catch(_.curry(this.helpers.handleError)('Can\'t get the catalog'));
  }

  findById(host: string, url: string): Promise<Show> {
    let scrapper;
    let isHtml:boolean = false;
      return this.helpers.getPlugin(host)
        .then(plugin => {
          if(plugin.show.scrapper) {
            scrapper = new Scrapper();
            isHtml = true;
          } else {
            scrapper =new ApiMapping();
          }
          
          scrapper.setPlugin(plugin.show);
          return this.http
            .get(`${plugin.url}${url}`)
            .toPromise();
        })
        .then(data => {
          const show = isHtml? scrapper.startScrappe(data['_body']) : scrapper.startMapping(data.json());
          return show && show[0] ? show[0] : this.helpers.handleError('Can\'t get the catalog', {
            developerMessage: `${url} can't be scrapped`,
            code: '500'
          });
        })
        .catch(_.curry(this.helpers.handleError)('Can\'t get the show'));
  }
}
