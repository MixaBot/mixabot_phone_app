import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const dbUrl = 'http://addb.absolutdrinks.com';
const apiKey = 'c67719d1c318404bbf285837cab887b4';

export interface IngredientPositions {
  position: number;
  positionName: string;
  name: string;
}
/*
  Generated class for the DrinkServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DrinkServiceProvider {
  hostName: string;

  constructor(public http: Http) {
  }

  getDrinks(hostName: string) {
    return this.http.get('./assets/data/drinks.json').map(response => response.json());
  }

  getIngredients(hostName: string) {
    return this.http.get(`http://${hostName}/ingredients`).map(response => response.json());
  }

  setIngredients(ingredients: IngredientPositions[]) {
    const params = ingredients.reduce((ingredients, ingredient) => {
      ingredients[`p${ingredient.position}`] = ingredient.name || 'Empty';
      return ingredients;
    }, {});
    return this.http.get(
      `http://${this.hostName}/ingredients`,
      {params}
      )
      .map(response => response.json());
  }

  makeDrink(hostName: string) {
    const config = {
      params: {}
    };
    // From 6 different positions, choose 4 at random to set a value from 0 - 1
    this.getUniqueRandomInRange(6, this.getRandomInRange(1, 4))
      .sort() // Sort in ascending order
      .map(pos => config.params['p' + pos] = Math.random().toFixed(2));
    return this.http.get(`http://${hostName}/drinks/make`, config).map(response => response.json());
  }

  private getRandomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getUniqueRandomInRange(max: number, count: number) {
    var arr = []
    while(arr.length < count){
      var randomnumber = Math.floor(Math.random()*max) + 1;
      if(arr.indexOf(randomnumber) > -1) continue;
      arr.push(randomnumber);
    }
    return arr;
  }
}
