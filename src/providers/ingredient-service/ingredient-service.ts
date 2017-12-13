import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Ingredient} from "./ingredient";
import {ConfigProvider} from "../config/config-service";

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
  ingredients: Ingredient[];
  usedIngredients: Ingredient[];

  constructor(public http: Http, private configService: ConfigProvider) {
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
    this.usedIngredients = ingredients;
    return this.http.get(
      `http://${this.configService.get('hostName')}/ingredients`,
      {params}
    ).map(response => response.json()).subscribe(response => {
      if (response.error) {

      }
      this.usedIngredients = ingredients;
    });
  }

  getIngredients(keyword?: string) {
    return !keyword ? this.ingredients : this.ingredients
      .filter(ingredient => ingredient.isBaseSpirit && ingredient.name.toLowerCase().startsWith(keyword.toLowerCase()));
  }

  getIngredient(id: string): Ingredient {
    return this.ingredients.find(ingredient => ingredient.id === id);
  }

  getIngredientByName(name: string): Ingredient {
    return this.ingredients.find(ingredient => ingredient.name.toLowerCase() === (name && name.toLowerCase()));
  }

  getUsedIngredients() {
    return this.usedIngredients;
  }
}
