import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Scrapper } from './scrapper';
import { Show } from '../models/show';
import 'rxjs/add/operator/map';

/*
  Generated class for the Catalog provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Catalog {

  public catalog: Array<Show>;
  public show: any;

  constructor(public http: Http, public scrapper: Scrapper) {
    this.http = http;
    this.scrapper = scrapper;
  }

  find(host: string, page: number) {
    this.http
      .get(`assets/plugins/${host}.json`)
      .map(res => res.json())
      .subscribe(plugin => {
        if (!plugin) {
          console.error(`${plugin} not found`);
          return;
        };

        this.http
          .get(`${plugin.catalog.url}?${plugin.catalog.pagination}=${page}`).subscribe(
          html => {
            this.catalog = this.scrapper.scrappe(html['_body'], plugin.catalog);
          },
          err => console.error(err));
      },
      err => console.error(err));
  }

  findById(host: string, url: string) {
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
            this.show = this.scrapper.scrappe(html['_body'], plugin.show);
          },
          err => console.error(err));
      },
      err => console.error(err));
  }
}
