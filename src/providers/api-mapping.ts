import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import _ from 'lodash';

/*
  Generated class for the ApiMapping provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiMapping {

  private plugin: any;

  constructor() { }

  setPlugin(plugin: any) {
    this.plugin = plugin;
  }

  public getPlugin() {
    return this.plugin;
  }

  public startMapping(data: any): Array<any> {
    let result: Array<any> = [],
      mappedKeys: any = this.plugin.api;
    const transform: any = this.plugin.transform;

    if (!data) {
      console.error('api-mapping--> data is empty on', mappedKeys);
      return [];
    }

    // Reverse key value
    mappedKeys = _.invert(mappedKeys);

    data = data[this.plugin.startTag];
    result = data && (Array.isArray(data) ? data.map((element) => _.mapKeys(element, (value, key) => mappedKeys[key])) : _.mapKeys(data, (value, key) => mappedKeys[key]))

    if (transform) {
      Object.keys(transform).forEach(transformation => {
        result.forEach((item, $index) => {
          try {
            let compiled = _.template(transform[transformation]);
            item[transformation] = compiled(item);
            result[$index] = item;
          } catch (err) {
            console.error('api-mapping--> Error on transformation, ', transformation, err);
          }
        });
      });
    }

    return result;
  }

}
