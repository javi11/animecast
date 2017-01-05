import { NgModule } from '@angular/core';
import { CacheService } from "ionic-cache/ionic-cache";
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { ShowDetails } from '../pages/show/show.component';
import { Details } from '../pages/show/details/details';
import { Episodes } from '../pages/show/episodes/episodes';
import { ElasticHeader } from '../components/elastic-header/elastic-header';
import { Gallery } from '../components/gallery/gallery';
import { Scrapper } from '../providers/scrapper';
import './rxjs-extensions';

@NgModule({
  declarations: [
    MyApp,
    Home,
    ShowDetails,
    Details,
    Episodes,
    ElasticHeader,
    Gallery
  ],
  providers: [
    CacheService,
    Scrapper
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    ShowDetails,
    Details,
    Episodes
  ]
})
export class AppModule {}
