import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { ShowDetails } from '../pages/show/show.component';
import { DetailsComponent } from '../pages/show/details/details.component';
import { EpisodesComponent } from '../pages/show/episodes/episodes.component';
import { ElasticHeader } from '../components/elastic-header/elastic-header';
import { Gallery } from '../components/gallery/gallery';
import { Scrapper } from '../providers/scrapper';
import { ProvidersHelpers } from '../providers/helpers';
import { ConfigProvider } from '../config/config.provider';
import './rxjs-extensions';

//Video Player
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {PlayerComponent} from '../pages/player/player.component';

export function provideStorage() {
  return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__animecast' });
}

@NgModule({
  declarations: [
    MyApp,
    Home,
    ShowDetails,
    DetailsComponent,
    EpisodesComponent,
    ElasticHeader,
    Gallery,
    PlayerComponent
  ],
  providers: [
    ConfigProvider,
    Scrapper,
    ProvidersHelpers,
    { 
      provide: Storage, 
      useFactory: provideStorage 
    }
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    ShowDetails,
    PlayerComponent,
    DetailsComponent,
    EpisodesComponent
  ]
})
export class AppModule {}
