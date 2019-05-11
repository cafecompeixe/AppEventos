import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServicesProvider } from '../providers/services/services';
import { HttpModule } from '@angular/http';
import { SlidesPageModule } from '../pages/slides/slides.module';
import { MeusEventosPageModule } from '../pages/meus-eventos/meus-eventos.module';
import { SobrePageModule } from '../pages/sobre/sobre.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { MdlInformacoesEventosPageModule } from '../modals/mdl-informacoes-eventos/mdl-informacoes-eventos.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    SlidesPageModule,
    MenuPageModule,
    TabsPageModule,
    MeusEventosPageModule,
    SobrePageModule,
    MdlInformacoesEventosPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider
  ]
})
export class AppModule {}
