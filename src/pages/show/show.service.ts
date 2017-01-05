import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Show } from './show';
/*
  Generated class for the ShowService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShowService {

  // Observable string sources
  private showSorce = new Subject<Show>();
  // Observable string streams
  public show$:Observable<any> = this.showSorce.asObservable();
  // Service message commands
  showLoaded(show: Show) {
    this.showSorce.next(show);
  }
}
