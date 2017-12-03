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
import { DrinkServiceProvider } from '../providers/drink-service/drink-service';
import { IngredientServiceProvider } from '../providers/ingredient-service/ingredient-service';

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
    DrinkServiceProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: (drinks: DrinkServiceProvider) => () => drinks.load(),
      deps: [DrinkServiceProvider],
      multi: true
    },
    IngredientServiceProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: (ingredients: IngredientServiceProvider) => () => ingredients.load(),
      deps: [IngredientServiceProvider],
      multi: true
    }
  ]
})
export class AppModule {}
