/// <reference path="../declarations.d.ts" />
import { Injectable } from '@angular/core';
import jquery from 'jquery';

/*
  Generated class for the Scrapper provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Scrapper {

  constructor() {
  }

  public scrappe(html: any, find: any):Array<any> {
    if(!html) {
      console.error('html is empty on', find);
      return [];
    }

    const data:any = jquery(html);
    const startHtml:any = data.find(find.startTag);
    let result: Array<any> = [];
    find = find.scrapper;

    if(!startHtml) {
      console.error(`${find.startTag} not found on the html`);
      return [];
    }
    startHtml.each((index, item) => {
      let jqueryItem = jquery(item);
      let element = <any>{};
      Object.keys(find).forEach((key) => {
        if (typeof find[key] === 'object') {
          element[key] = this.scrappe(item, find[key]);
        } else {
          if(this.isRegex(find[key])) {
              var regex = new RegExp(find[key].split('regexp:')[1]);
              var matches = regex.exec(html);
              console.log(matches);
              element[key] = matches.length > 0 && matches[1];
          } else {
            let [findTag, extract] = find[key].split('@');
            if(!extract) {
              console.error('No tag @ found on ', key);
              return [];
            }
            let item = findTag ? jqueryItem.find(findTag) : jqueryItem;
            element[key] = this.getResource(item, extract);
          }
        }
      });
      result.push(element);
    });
    return result;
  }

  private getResource(item, extract) {
    return (extract === 'html')? item.html() : item.attr(extract);
  }

  private isRegex(findTag) {
    return findTag.indexOf('regex:') > -1;
  }

}
