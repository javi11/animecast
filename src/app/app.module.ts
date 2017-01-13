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

@NgModule({
  declarations: [
    MyApp,
    Home,
    ShowDetails,
    EpisodeDetails,
    Details,
    Episodes,
    ElasticHeader,
    Gallery
  ],
  providers: [
    Scrapper,
    ProvidersHelpers
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
