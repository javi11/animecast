/// <reference path="../declarations.d.ts" />
import { Injectable } from '@angular/core';
import jquery from 'jquery';
import _ from 'lodash';

/*
  Generated class for the Scrapper provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Scrapper {

  private plugin: any;

  constructor() {}

  public startScrappe(html: any) {
    return this.scrappe(html, this.plugin);
  }

  setPlugin(plugin: any) {
    this.plugin = plugin;
  }

  public getPlugin() {
    return this.plugin;
  }

  private scrappe(html: any, find: any):Array<any> {
    if(!html) {
      console.error('html is empty on', find);
      return [];
    }

    const data:any = jquery(html);
    const startHtml:any = data.find(find.startTag);
    let result: Array<any> = [];
    const transform = find.transform;

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
              var regex = new RegExp(find[key].split('regex:')[1]);
              var matches = regex.exec(html);
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
    if(transform) {
      Object.keys(transform).forEach(transformation =>{
        result.forEach((item, $index) => {
          if(item[transformation]) {
            try {
              let compiled = _.template(transform[transformation]);
              item[transformation] = compiled(item);
              result[$index] = item;
            } catch(err) {
              console.error('Error on transformation, ', transformation, err);
            }
          }
        });
      });
    }
    return result;
  }

  private getResource(item, extract) {
    let value:any;

    const extractAtributtes:Array<string> = extract.split('||');
    for(let i:number = 0; i < extractAtributtes.length; i++) {
      value = (extractAtributtes[i] === 'html')? item.html() : item.attr(extractAtributtes[i]);
      if(value){
        break;
      }
    }
    return value
  }

  private isRegex(findTag) {
    return findTag.indexOf('regex:') > -1;
  }

}
