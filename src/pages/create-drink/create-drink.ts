import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {DrinkServiceProvider} from "../../providers/drinks/drink-service";
import {Ingredient} from "../../providers/ingredients/ingredient";
import {Drink} from "../../providers/drinks/drink";
import {ToastService} from "../../util/toast-service";

@Component({
  selector: 'page-create-drink',
  templateUrl: 'create-drink.html',
})
export class CreateDrinkPage {
  newDrink: Drink;
  ingredients: Ingredient[];

  constructor(
    public viewCtrl: ViewController,
    private toastService: ToastService,
    private drinkService: DrinkServiceProvider) {}

  ngOnInit() {
    this.ingredients = [{id: '', isBaseSpirit: true, name: ''}];
    this.newDrink = {name: '', id: ''};
    this.newDrink.ingredients = this.ingredients;
  }

  onBlur($event, index) {
    if (!$event.value && this.ingredients.length > 1) {
      this.ingredients.splice(index, 1)
    }
  }

  onDrinkChange(value) {
    this.newDrink.id = this.createId(value);
  }

  onIngredientChange(value, index) {
    this.ingredients[index].id = this.createId(value);
  }

  save() {
    this.drinkService.createDrink(this.newDrink);
    this.toastService.showToast(`Saved new drink: "${this.newDrink.name}"`);
    this.viewCtrl.dismiss(true);
  }

  add() {
    const length = this.ingredients.length;
    if(this.ingredients.length < 10 && this.ingredients[length - 1].name) {
      this.ingredients.push({name: '', id: '', isBaseSpirit: true});
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  private createId(value) {
    // Replace non-alphanumeric characters with a dash
    const str = value && value.toLowerCase().replace(/\W+/g, '-');

    if (!str) {
      return false;
    }

    // Trim leading or trailing dashes
    return str.replace(/^-|-$/, '');
  }
}
