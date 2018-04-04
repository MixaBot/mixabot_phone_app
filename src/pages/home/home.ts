import {Component} from '@angular/core';
import {DrinkServiceProvider} from '../../providers/drinks/drink-service';
import {IngredientServiceProvider} from "../../providers/ingredients/ingredient-service";
import {Drink} from "../../providers/drinks/drink";
import {Ingredient} from "../../providers/ingredients/ingredient";
import {ToastService} from "../../util/toast-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentPage: number;
  drinks: Drink[];
  visibleDrinks: Drink[];
  ingredientsToFilterBy: Ingredient[];
  pageSize: number = 10;

  constructor(private drinkService: DrinkServiceProvider,
              private ingredientService: IngredientServiceProvider,
              private toastService: ToastService) {
    this.ingredientsToFilterBy = [];
  }

  getAvailableDrinks() {
    const usedIngredients = this.ingredientService.getUsedIngredients();
    this.drinks = this.drinkService.getAvailableDrinksFromIngredients(usedIngredients)
      .filter(drink =>
        drink.ingredients.some(ingredient => ingredient.isBaseSpirit)
        && drink.ingredients.every(drinkIngredient =>
          !this.ingredientsToFilterBy.some(filterIngredient => filterIngredient.name === drinkIngredient.name)
        )
      );
    this.currentPage = 0;
    this.visibleDrinks = this.drinks.slice(0, this.pageSize);
  }

  infiniteScroll(event) {
    this.currentPage++;
    this.visibleDrinks = this.drinks.slice(0, (this.currentPage + 1) * this.pageSize);
    event.complete();
  }

  makeRandomDrink() {
    this.drinkService.makeRandomDrink().subscribe(response => {
      this.toastService.showToast('Random drink sent to Mix-A-Bot');
    });
  }

  filterByIngredient(ingredient: Ingredient) {
    this.ingredientsToFilterBy.push(ingredient);
    this.getAvailableDrinks();
  }
}
