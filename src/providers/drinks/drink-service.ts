import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Drink} from "./drink";
import {IngredientServiceProvider} from "../ingredients/ingredient-service";
import {Ingredient} from "../ingredients/ingredient";
import {ConfigProvider} from "../config/config-service";

export function initDrinkService (service: DrinkServiceProvider) {
  return () => service.load();
}
/*
  Generated class for the DrinkServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DrinkServiceProvider {
  drinks: Drink[];

  constructor(
    public http: Http,
    private configService: ConfigProvider,
    private ingredientsService: IngredientServiceProvider) {
  }

  load() {
    Promise.all([
      this.http.get('./assets/data/drinks.json').map(response => response.json()).toPromise(),
      this.ingredientsService.load()
    ]).then(values => {
      this.drinks = values[0]['result'];
      this.linkIngredients();
    });
  }

  linkIngredients() {
    const ingredients = this.ingredientsService.getIngredients();
    this.drinks.forEach(drink => {
      drink.ingredients = drink.ingredients.map(drinkIngredient => {
        return {...drinkIngredient, ...ingredients.find(ingredient => ingredient.id === drinkIngredient.id)};
      });
    });
  }

  getAvailableDrinksFromIngredients(usedIngredients: Ingredient[]) {
    return this.drinks.filter(drink =>
      drink.ingredients.every(drinkIngredient =>
        !drinkIngredient.isBaseSpirit
        || usedIngredients.some(usedIngredient => usedIngredient && usedIngredient.id === drinkIngredient.id)
      ));
  }

  makeDrink(drink: Drink) {
    if(!drink) return;
    const config = {
      params: {}
    };
    drink.ingredients.forEach(drinkIngredient => {
      const position = this.ingredientsService.usedIngredients
        .findIndex(usedIngredient => usedIngredient && usedIngredient.id === drinkIngredient.id);

      const amountTokens = drinkIngredient.text.split(' ');
      const measurementValue = Number(amountTokens[0]);
      const measurementUnit = amountTokens[1];
      if (position > -1) {
        config.params['p' + (position+ 1)] = measurementUnit === 'Part' || measurementUnit === 'Parts'
          ? measurementValue : 0.1 * measurementValue;
      }
    });

    return this.http.get(`http://${this.configService.get('hostName')}/drinks/make`, config).map(response => response.json());
  }

  makeRandomDrink() {
    const config = {
      params: {}
    };
    // From 6 different positions, choose 4 at random to set a value from 0 - 1
    this.getUniqueRandomInRange(6, this.getRandomInRange(1, 4))
      .sort() // Sort in ascending order
      .map(pos => config.params['p' + pos] = Math.random().toFixed(2));
    return this.http.get(`http://${this.configService.get('hostName')}/drinks/make`, config).map(response => response.json());
  }

  private getRandomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getUniqueRandomInRange(max: number, count: number) {
    const arr = [];
    while(arr.length < count){
      const randomnumber = Math.floor(Math.random()*max) + 1;
      if(arr.indexOf(randomnumber) > -1) continue;
      arr.push(randomnumber);
    }
    return arr;
  }
}