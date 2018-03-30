import { APP_INITIALIZER } from "@angular/core";
import { NgModule, ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { Pro } from '@ionic/pro';
import { Hotspot } from "@ionic-native/hotspot";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { CreateDrinkPage } from "../pages/create-drink/create-drink";
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

import { AutoComplete } from "../util/auto-complete";

const IonicPro = Pro.init('fab5de14', {appVersion: '0.0.1'});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    AutoComplete,
    DrinkCard,
    AboutPage,
    ContactPage,
    CreateDrinkPage,
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
    CreateDrinkPage,
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
    ConfigProvider,
    IonicErrorHandler,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }] // This line
  ]
})
export class AppModule {}
