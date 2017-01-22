import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/*
  Generated class for the EpisodeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EpisodeService {

  constructor(public storage: Storage, public events: Events) {}

  updateEpisodeStatus(showLink:string, episode:any):Promise<any> {
    return this.getEpisodes(showLink).then((episodes) => {
      if(episodes) {
        let episodeIndex:number = episodes.findIndex(item => item.id === episode.id);
        episodeIndex > 0 ? episodes[episodeIndex].curentTime = episode.currentTime : episodes.push(episode);
      } else {
        episodes = [episode];
      }
      this.events.publish('episode:updated', episode);
      return this.storage.set(showLink, episodes);
    })
    
  }

  getEpisodes(showLink:any):Promise<any> {
    return this.storage.get(showLink);
  }
  
}
