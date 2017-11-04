import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DrinkServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DrinkServiceProvider {

  constructor(public http: Http) {
  }

  getDrinks(hostName?: string) {
    return this.http.get(`http://${hostName}/drinks/make`).map(response => response.json());
  }

  getDrinksTest() {
    return this.http.get('/assets/data/drinks.json').map(response => response.json());
  }
}
