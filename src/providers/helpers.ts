import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProvidersHelpers {
   constructor(public http: Http) {}

  getPlugin(host):Promise<any> {
    return this.http
      .get(`assets/plugins/${host}.json`)
      .map(res => res.json())
      .toPromise();
  }

  handleError(message: string, error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(message);
  }

}