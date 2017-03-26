import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { ShowDetails } from '../pages/show/show.component';
import { DetailsComponent } from '../pages/details/details.component';
import { EpisodesComponent } from '../pages/episodes/episodes.component';
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
import { PlayerComponent } from '../pages/player/player.component';
import { TrackSelector } from '../components/player/track-selector';
import { OverlayPlay } from '../components/player/overlay-play';
import { AspectRatioButton } from '../components/player/aspect-ratio-button';

@NgModule({
  declarations: [
    MyApp,
    Home,
    ShowDetails,
    DetailsComponent,
    EpisodesComponent,
    ElasticHeader,
    Gallery,
    TrackSelector,
    OverlayPlay,
    PlayerComponent,
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
    Home,
    ShowDetails,
    PlayerComponent,
    DetailsComponent,
    EpisodesComponent
  ]
})
export class AppModule { }
