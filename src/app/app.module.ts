import { APP_INITIALIZER } from "@angular/core";
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SetupPage } from '../pages/setup/setup';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DrinkServiceProvider, initDrinkService } from '../providers/drink-service/drink-service';
import { IngredientServiceProvider, initIngredientService } from '../providers/ingredient-service/ingredient-service';
import { ConfigProvider } from '../providers/config/config-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
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
    ConfigProvider
  ]
})
export class AppModule {}
