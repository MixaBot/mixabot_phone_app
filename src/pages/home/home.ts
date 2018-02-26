import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { DrinkServiceProvider } from '../../providers/drinks/drink-service';
import { IngredientServiceProvider } from "../../providers/ingredients/ingredient-service";
import {Drink} from "../../providers/drinks/drink";
import {Ingredient} from "../../providers/ingredients/ingredient";

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
              private toastCtrl: ToastController) {
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
      this.showToast('Random drink sent to Mix-A-Bot');
    });
  }

  filterByIngredient(ingredient: Ingredient) {
    this.ingredientsToFilterBy.push(ingredient);
    this.getAvailableDrinks();
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'top',
      showCloseButton: true
    }).present();
  }
}
