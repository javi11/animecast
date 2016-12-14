import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Scrapper } from './scrapper';
import { Show } from '../models/show';

/*
  Generated class for the Catalog provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Catalog {

  constructor(public http: Http) {}

  find(host: string, page: number): Promise<Array<Show>> {
    let scrapper;

    return this.http
      .get(`assets/plugins/${host}.json`)
      .map(res => res.json())
      .toPromise()
      .then(plugin => {
        scrapper = new Scrapper();
        scrapper.setPlugin(plugin.catalog);

        return this.http
          .get(`${plugin.catalog.url}?${plugin.catalog.pagination}=${page}`)
          .toPromise();
      })
      .then(html => {
        return Promise.resolve(scrapper.startScrappe(html['_body']));
      })
      .catch(this.handleError);
  }

  findById(host: string, url: string): Promise<Show> {
    let scrapper;

    return this.http
      .get(`assets/plugins/${host}.json`)
      .map(res => res.json())
      .toPromise()
      .then(plugin => {
        scrapper = new Scrapper();
        scrapper.setPlugin(plugin.show);
        return this.http
          .get(`${plugin.url}${url}`)
          .toPromise();
      })
      .then(html => {
        const show = scrapper.startScrappe(html['_body']);
       console.info(show);
        return show && show[0] ? Promise.resolve(show[0]) : this.handleError({
          message: `${url} can't be scrapped`,
          code: '500'
        });
      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
