import {APP_INITIALIZER, ErrorHandler, Injectable} from "@angular/core";
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Hotspot } from "@ionic-native/hotspot";
import { IonicApp, IonicModule } from 'ionic-angular';
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

import {UtilModule} from "../util/util.module";
import {ToastService} from "../util/toast-service";


@Injectable()
class ToastErrorHandler implements ErrorHandler {
  constructor(private toastService: ToastService) {}
  handleError(error: Error) {
    this.toastService.showToast(error.message);
  }
}

@NgModule({
  declarations: [
    MyApp,
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
    UtilModule,
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
    {provide: ErrorHandler, useClass: ToastErrorHandler}
  ]
})
export class AppModule {}
