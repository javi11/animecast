import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ShowService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShowService {

  private _show: BehaviorSubject<any>; 

  constructor() {
    this._show = <BehaviorSubject<any>>new BehaviorSubject([]);
  }

  setShow(show:any){
    this._show.next(show);
  }

  get show(): Observable<any> {
    return this._show.asObservable();
  }
}
