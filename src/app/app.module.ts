import { APP_INITIALIZER } from "@angular/core";
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { Pro } from '@ionic/pro';
import { Hotspot } from "@ionic-native/hotspot";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SetupPage } from '../pages/setup/setup';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DrinkServiceProvider, initDrinkService } from '../providers/drinks/drink-service';
import { DrinkCard } from '../providers/drinks/drink-card';
import { IngredientServiceProvider, initIngredientService } from '../providers/ingredients/ingredient-service';
import { ConfigProvider } from '../providers/config/config-service';

const IonicPro = Pro.init('fab5de14', {appVersion: '0.0.1'});

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    DrinkCard,
    HomePage,
    SetupPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    DrinkCard,
    HomePage,
    SetupPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IngredientServiceProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: initIngredientService,
      deps: [IngredientServiceProvider],
      multi: true
    },
    DrinkServiceProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: initDrinkService,
      deps: [DrinkServiceProvider],
      multi: true
    },
    Hotspot,
    ConfigProvider
  ]
})
export class AppModule {}
