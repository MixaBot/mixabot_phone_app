import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DrinkServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  Server IP is '10.0.0.185'
*/
@Injectable()
export class DrinkServiceProvider {

  constructor(public http: Http) {
  }

  getDrinks(hostName?: string) {
    return this.http.get(`http://${hostName}/drinks/make`).map(response => response.json());
  }

  getTime() {
    return this.http.get('http://date.jsontest.com/').map(response => response.json());
  }
}
