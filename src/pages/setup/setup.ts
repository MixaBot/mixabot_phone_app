import 'rxjs/add/operator/debounceTime';
import { Component } from '@angular/core';
import {Http} from "@angular/http";
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

import { DrinkServiceProvider} from '../../providers/drink-service/drink-service';
import {IngredientServiceProvider} from "../../providers/ingredient-service/ingredient-service";
import {Ingredient} from "../../providers/ingredient-service/ingredient";

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})
export class SetupPage {
  completeIngredients: Function;
  hostName: string;
  ingredientSuggestions: Ingredient[]
  ingredientsForm: FormGroup;
  isSuggestionHovering: boolean;
  numPositions: number;
  positionFocused: number;

  constructor(
    private http: Http,
    private drinkService: DrinkServiceProvider,
    private ingredientService: IngredientServiceProvider,
    public formBuilder: FormBuilder)
  {
    this.numPositions = 10;
    this.hostName = '10.0.0.185';
  }

  ngOnInit() {
    this.initIngredientsForm();
    this.completeIngredients = keyword => {
      return this.ingredientService.getIngredients();
    }
  }

  private initIngredientsForm() {
    const positionsArray = new FormArray([]);
    for(var i = 1; i <= this.numPositions; i++) {
      const control = new FormControl('', Validators.compose([
        Validators.maxLength(32),
        Validators.pattern('[a-zA-Z ]*')
      ])) as FormControl;
      control.valueChanges.debounceTime(500).subscribe(keyword => {
        if (keyword.length > 1) {
          this.ingredientSuggestions = this.ingredientService.getIngredients(keyword);
        } else {
          this.ingredientSuggestions = null;
        }
      });
      positionsArray.push(control);
    }
    this.ingredientsForm = this.formBuilder.group({
      positions: positionsArray
    });
  }

  clearSuggestions() {
    if (!this.isSuggestionHovering)
      this.positionFocused = null;
  }


  ingredientSelected(ingredient, position) {
    this.isSuggestionHovering = false;
    this.positionFocused = null;
    // this.ingredientsForm.get('positions').patchValue({
    //   [position]: ingredient.name
    // });
  }

  setIngredients() {
    if(this.ingredientsForm.invalid) return;

    console.log(this.ingredientsForm.get('positions'));
    const ingredients = this.ingredientsForm.get('positions').value.map(ingredient => {
      return this.ingredientService.getIngredientByName(ingredient);
    });
    this.ingredientService.setIngredients(ingredients);
  }
}
