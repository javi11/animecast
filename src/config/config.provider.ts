import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DefaultConfig } from './defaultConfig';

/*
  Generated class for the EpisodeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConfigProvider {

  config: any;

  constructor(public storage: Storage) { }

  set(config: any): Promise<any> {
    return this.storage.ready().then(() => this.storage.set('config', config));
  }

  get(): Promise<any> {
    return this.storage.ready().then(() => this.storage.get('config').then(config => !config ? this.storage.set('config', DefaultConfig) : Promise.resolve(config)));
  }

}
