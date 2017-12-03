import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Ingredient} from "./ingredient";

const dbUrl = 'http://addb.absolutdrinks.com';
const appId = '14274';

export function initIngredientService (service: IngredientServiceProvider) {
  return () => service.load();
}
/*
  Generated class for the IngredientServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IngredientServiceProvider {
  allDrinks: any;
  ingredients: Ingredient[];
  hostName: string;

  constructor(public http: Http) {
    this.hostName = '10.0.0.185';
  }

  load() {
    return this.http.get('./assets/data/ingredients.json').map(response => response.json()).toPromise()
      .then(response => {
        this.ingredients = response['result'];
      });
  }

  setIngredients(ingredients: Ingredient[]) {
    const params = ingredients.reduce((ingredients, ingredient, index) => {
      ingredients[`p${index}`] = ingredient && ingredient.id || 'Empty';
      return ingredients;
    }, {});
    return this.http.get(
      `http://${this.hostName}/ingredients`,
      {params}
    )
      .map(response => response.json());
  }

  getIngredients(keyword?: string) {
    return !keyword ? this.ingredients : this.ingredients
      .filter(ingredient => ingredient.name.toLowerCase().startsWith(keyword.toLowerCase()));
  }

  getIngredient(id: string): Ingredient {
    return this.ingredients.find(ingredient => ingredient.id === id);
  }

  getIngredientByName(name: string): Ingredient {
    return this.ingredients.find(ingredient => ingredient.name.toLowerCase() === (name && name.toLowerCase()));
  }

  getAvailableDrinksFromIngredients(ingredients: string[]) {
    this.http.get(`${dbUrl}/drinks/?appId=${appId}`).map(response => response.json())
      .subscribe(drinks => {
        this.allDrinks = drinks;
        console.log(drinks);
      });
  }
}
