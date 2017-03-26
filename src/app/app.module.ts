import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home.page';
import { ShowPage } from '../pages/show/show.page';
import { DetailsPage } from '../pages/details/details.page';
import { EpisodesPage } from '../pages/episodes/episodes.page';
import { ElasticHeader } from '../components/elastic-header/elastic-header';
import { Gallery } from '../components/gallery/gallery';
import { Scrapper } from '../providers/scrapper';
import { ProvidersHelpers } from '../providers/helpers';
import { ConfigProvider } from '../config/config.provider';
import './rxjs-extensions';

//Video Player
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { PlayerPage } from '../pages/player/player.page';
import { TrackSelector } from '../components/player/track-selector';
import { OverlayPlay } from '../components/player/overlay-play';
import { AspectRatioButton } from '../components/player/aspect-ratio-button';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShowPage,
    DetailsPage,
    EpisodesPage,
    ElasticHeader,
    Gallery,
    TrackSelector,
    OverlayPlay,
    PlayerPage,
    AspectRatioButton
  ],
  providers: [
    ConfigProvider,
    Scrapper,
    ProvidersHelpers
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__animecast',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShowPage,
    PlayerPage,
    DetailsPage,
    EpisodesPage
  ]
})
export class AppModule { }
