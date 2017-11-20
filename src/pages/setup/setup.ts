import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DrinkServiceProvider, IngredientPositions } from '../../providers/drink-service/drink-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
  providers: [DrinkServiceProvider]
})
export class SetupPage {
  hostName: string;
  numPositions: number;
  ingredients: IngredientPositions[];
  ingredientsForm: FormGroup;

  constructor(public navCtrl: NavController, private drinkService: DrinkServiceProvider, public formBuilder: FormBuilder) {
    this.numPositions = 10;
    this.hostName = '10.0.0.185';
    this.ingredients = [];
    for(var i = 1; i <= this.numPositions; i++) {
      this.ingredients.push({position: i, name: '', positionName: `p${i}`});
    }
    this.initIngredientsForm();
  }

  private initIngredientsForm() {
    const formObject = {};
    for(var i = 1; i <= this.numPositions; i++) {
      formObject[`p${i}`] = ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*')])];
    }
    this.ingredientsForm = this.formBuilder.group(formObject);
  }

  setIngredients() {
    if(this.ingredientsForm.invalid) return;

    this.drinkService.setIngredients(this.ingredients)
      .subscribe(response => {
        if (response.error) console.log(response);
      });
  }
}
