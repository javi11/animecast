import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Plugins } from "../plugins/index";

/*
  Generated class for the Shows provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Shows {

  constructor(private plugins: Plugins) {
    this.plugins = plugins;
  }
  
  find(host:String) {
    const plugin = this.plugins.getPlugin(host);

    return plugin.getCatalog();
  }
  
  findById(host:String, id:String) {
   
  }
  
}

