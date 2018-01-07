import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { DrinkServiceProvider } from '../../providers/drinks/drink-service';
import { IngredientServiceProvider } from "../../providers/ingredients/ingredient-service";
import {Drink} from "../../providers/drinks/drink";
import { home as homeText } from '../../lang/en';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  drinks: Drink[];
  ingredients: any;

  constructor(private drinkService: DrinkServiceProvider,
              private ingredientService: IngredientServiceProvider,
              private toastCtrl: ToastController) {
  }

  getAvailableDrinks() {
    const usedIngredients = this.ingredientService.getUsedIngredients();
    this.drinks = this.drinkService.getAvailableDrinksFromIngredients(usedIngredients)
      .filter(drink => drink.ingredients.some(ingredient => ingredient.isBaseSpirit));
  }

  makeDrink(drink: Drink) {
    if(!drink) {
      this.showToast('No drink was selected');
      return;
    }
    this.drinkService.makeDrink(drink).subscribe(response => {
      this.showToast(homeText.success.makeDrink)
    }, error => {
      this.showToast('There was an error making the drink');
      console.log('There was an error making the drink', error);
    })
  }

  makeRandomDrink() {
    this.drinkService.makeRandomDrink().subscribe(response => {
      this.showToast('Random drink sent to Mix-A-Bot');
    });
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
