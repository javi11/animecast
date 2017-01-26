import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { ConfigProvider } from '../../../config/config.provider';

/*
  Generated class for the EpisodeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EpisodeService {

  constructor(public storage: Storage, public events: Events, public config:ConfigProvider) {}

  updateEpisodeStatus(showLink:string, episode:any):Promise<any> {
    return this.getEpisodes(showLink).then((episodes) => {
      if(episodes) {
        let episodeIndex:number = episodes.findIndex(item => item.id === episode.id);
        console.log(episodeIndex);
        episodeIndex > -1 ? episodes[episodeIndex].currentTime = episode.currentTime : episodes.push(episode);
      } else {
        episodes = [episode];
      }
      this.events.publish('episode:updated', episode);
      return this.config.get().then(config => this.storage.set(`${config.provider}@${config.showLink}`, episodes));
    })
    
  }

  getEpisodes(showLink:any):Promise<any> {
    return this.config.get().then(config => this.storage.get(`${config.provider}@${config.showLink}`));
  }
  
}
