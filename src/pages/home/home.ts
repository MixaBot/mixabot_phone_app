import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DrinkServiceProvider } from '../../providers/drink-service/drink-service';
import { IngredientServiceProvider } from "../../providers/ingredient-service/ingredient-service";
import { home as homeText } from '../../lang/en';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  drinks: any;
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
    // TODO
    this.ingredientService.getAvailableDrinksFromIngredients(['Vodka', 'Rum'])
  }

  makeDrink() {
      if (!this.hostName) {
      this.showToast(homeText.errors.emptyHostName);
      return;
    }
    this.drinkService.makeDrink(this.hostName).subscribe(response => {
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
