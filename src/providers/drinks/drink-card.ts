import {Component, Input} from '@angular/core';
// import {DrinkServiceProvider} from "./drink-service";
// import {IngredientServiceProvider} from "../ingredients/ingredient-service";
import {Drink} from "./drink";

@Component({
  selector: 'drink-card',
  templateUrl: 'drink-card.html'
})
export class DrinkCard {
  @Input() drink: Drink
  //
  // constructor(
  //   private ingredientService: IngredientServiceProvider,
  //   private drinkService: DrinkServiceProvider
  // ){}
}
