import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const dbUrl = 'http://addb.absolutdrinks.com';
const appId = '14274';

/*
  Generated class for the IngredientServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IngredientServiceProvider {
  allDrinks: any;

  constructor(public http: Http) {
    console.log('Hello IngredientServiceProvider Provider');
  }

  // TODO: Get a list of drinks that are possible to make from the given ingredients
  getAvailableDrinksFromIngredients(ingredients: string[]) {
    this.http.get(`${dbUrl}/drinks/?appId=${appId}`).map(response => response.json())
      .subscribe(drinks => {
        this.allDrinks = drinks;
        console.log(drinks);
      });
  }
}
