import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DrinkServiceProvider } from '../../providers/drink-service/drink-service';
import { IngredientServiceProvider } from "../../providers/ingredient-service/ingredient-service";
import {Drink} from "../../providers/drink-service/drink";
import { home as homeText } from '../../lang/en';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  drinks: Drink[];
  ingredients: any;
  hostName: string;

  constructor(public navCtrl: NavController,
              private drinkService: DrinkServiceProvider,
              private ingredientService: IngredientServiceProvider,
              private toastCtrl: ToastController) {
    this.hostName = '10.0.0.185';
  }

  getDrinks() {
    console.log(this.drinkService.getDrinks());
  }

  getAvailableDrinks() {
    const usedIngredients = this.ingredientService.getUsedIngredients();
    this.drinks = this.drinkService.getAvailableDrinksFromIngredients(usedIngredients)
      .filter(drink => drink.ingredients.some(ingredient => ingredient.isBaseSpirit));
  }

  makeDrink(drink: Drink) {
    this.drinkService.makeDrink(this.hostName, drink).subscribe(response => {
      this.showToast(homeText.success.makeDrink)
    }, error => {
      this.showToast('There was an error making the drink');
      console.log('There was an error making the drink', error);
    })
  }

  getIngredients() {
    return this.ingredients;
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
