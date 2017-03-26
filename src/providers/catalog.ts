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

  constructor(public http: Http, public helpers: ProvidersHelpers) { }

  find(host: string, page: number): Promise<Array<Show>> {
    let scrapper;
    let isHtml: boolean = false;
    return this.helpers.getPlugin(host)
      .then(plugin => {
        if (plugin) {
          if (plugin.catalog.pagination === false && page > 0) {
            return Promise.resolve();
          }

          if (plugin.catalog.scrapper) {
            scrapper = new Scrapper();
            isHtml = true;
          } else {
            scrapper = new ApiMapping();
          }

          scrapper.setPlugin(plugin.catalog);
          let query: string = '';

          if (plugin.catalog.pagination) {
            query = `${plugin.catalog.pagination}=${page}`;
          }

          if (plugin.catalog.extrUrlParameters) {
            query += plugin.catalog.extrUrlParameters;
          }

          return this.http
            .get(`${plugin.catalog.url}?${query}`)
            .toPromise();
        } else {
          return this.helpers.handleError('Plugin not found', host);
        }
      })
      .then(data => {
        let result = [];
        if (data) {
          result = isHtml ? scrapper.startScrappe(data['_body']) : scrapper.startMapping(data.json());
        }

        return result;
      })
      .catch(_.curry(this.helpers.handleError)('Can\'t get the catalog'));
  }

  findById(host: string, url: string): Promise<Show> {
    let scrapper;
    let isHtml: boolean = false;
    return this.helpers.getPlugin(host)
      .then(plugin => {
        if (plugin.show.scrapper) {
          scrapper = new Scrapper();
          isHtml = true;
        } else {
          scrapper = new ApiMapping();
        }

        scrapper.setPlugin(plugin.show);
        return this.http
          .get(`${plugin.url}${url}`)
          .toPromise();
      })
      .then(data => {
        const show = isHtml ? scrapper.startScrappe(data['_body']) : scrapper.startMapping(data.json());
        return show && show[0] ? show[0] : this.helpers.handleError('Can\'t get the catalog', {
          developerMessage: `${url} can't be scrapped`,
          code: '500'
        });
      })
      .catch(_.curry(this.helpers.handleError)('Can\'t get the show'));
  }
}
