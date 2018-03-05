import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Drink} from "./drink";
import {Ingredient} from "../ingredients/ingredient";
import {DrinkServiceProvider} from "./drink-service";
import {home as homeText} from "../../lang/en";
import {ToastController} from "ionic-angular";

@Component({
  selector: 'drink-card',
  templateUrl: 'drink-card.html'
})
export class DrinkCard {
  @Input() drink: Drink
  @Output() onFilterByIngredient = new EventEmitter<Ingredient>();

  constructor(private drinkService: DrinkServiceProvider, private toastCtrl: ToastController) {}

  filterByIngredient(ingredient: Ingredient) {
    this.onFilterByIngredient.emit(ingredient);
  }
  makeDrink(drink) {
    if(!drink) {
      this.showToast('No drink was selected');
      return;
    }
    this.drinkService.makeDrink(drink).subscribe(response => {
      this.showToast(homeText.success.makeDrink)
    }, error => {
      this.showToast('There was an error making the drink. ' + (error ? error : ''));
      console.log('There was an error making the drink', error);
    })
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
