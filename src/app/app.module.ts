import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { ShowDetails } from '../pages/show/show.component';
import { EpisodeDetails } from '../pages/episode/episode.component';
import { Details } from '../pages/show/details/details';
import { Episodes } from '../pages/show/episodes/episodes';
import { ElasticHeader } from '../components/elastic-header/elastic-header';
import { Gallery } from '../components/gallery/gallery';
import { Scrapper } from '../providers/scrapper';
import { ProvidersHelpers } from '../providers/helpers';
import './rxjs-extensions';

//Video Player
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {PlayerComponent} from '../components/player/player';

@NgModule({
  declarations: [
    MyApp,
    Home,
    ShowDetails,
    EpisodeDetails,
    Details,
    Episodes,
    ElasticHeader,
    Gallery,
    PlayerComponent
  ],
  providers: [
    Scrapper,
    ProvidersHelpers
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
    EpisodeDetails,
    Details,
    Episodes
  ]
})
export class AppModule {}
