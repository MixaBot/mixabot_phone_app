import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Ingredient} from "./ingredient";
import {ConfigProvider} from "../config/config-service";

export const CUSTOM_INGREDIENTS_KEY = 'customIngredients';

export function initIngredientService (service: IngredientServiceProvider) {
  return () => service.load();
}

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
        this.usedIngredients = this.configService.getConfig().positions.map(ingredient => {
          return this.getIngredientByName(ingredient);
        });
      });
  }

  addNewIngredientsOnly(ingredients: Ingredient[]) {
    const allIngredients = this.getAllIngredients();
    ingredients.forEach(newIngredient => {
      if (!allIngredients.find(ingredient => ingredient.id === newIngredient.id)) {
        this.addCustomIngredient(newIngredient);
      }
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

  getAllIngredients() {
    let customIngredients = this.configService.get(CUSTOM_INGREDIENTS_KEY);
    if (!customIngredients) {
      customIngredients = [];
    }
    return customIngredients.concat(this.ingredients).sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
  }

  getIngredients(keyword?: string) {
    const allIngredients = this.getAllIngredients();
    return !keyword ? allIngredients : allIngredients
      .filter(ingredient => ingredient.isBaseSpirit && ingredient.name.toLowerCase().indexOf(keyword.toLowerCase()) > - 1);
  }

  getIngredient(id: string): Ingredient {
    return this.getAllIngredients().find(ingredient => ingredient.id === id);
  }

  getIngredientByName(name: string): Ingredient {
    return this.getAllIngredients().find(ingredient => ingredient.name.toLowerCase() === (name && name.toLowerCase()));
  }

  getUsedIngredients() {
    return this.usedIngredients;
  }

  private addCustomIngredient(ingredient: Ingredient) {
    const customIngredients = this.configService.get(CUSTOM_INGREDIENTS_KEY);
    customIngredients.push(ingredient);
    this.configService.set(CUSTOM_INGREDIENTS_KEY, customIngredients);
  }
}
