import {Component, EventEmitter, Input, Output} from '@angular/core';
// import {DrinkServiceProvider} from "./drink-service";
// import {IngredientServiceProvider} from "../ingredients/ingredient-service";
import {Drink} from "./drink";
import {Ingredient} from "../ingredients/ingredient";

@Component({
  selector: 'drink-card',
  templateUrl: 'drink-card.html'
})
export class DrinkCard {
  @Input() drink: Drink
  @Output() onFilterByIngredient = new EventEmitter<Ingredient>();

  filterByIngredient(ingredient: Ingredient) {
    this.onFilterByIngredient.emit(ingredient);
  }
}
