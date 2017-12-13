import 'rxjs/add/operator/debounceTime';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';

import {IngredientServiceProvider} from "../../providers/ingredient-service/ingredient-service";
import {Ingredient} from "../../providers/ingredient-service/ingredient";
import {ConfigProvider} from "../../providers/config/config-service";
import {Config} from "../../providers/config/config";
import {ToastController} from "ionic-angular";

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})
export class SetupPage {
  completeIngredients: Function;
  config: Config;
  ingredientSuggestions: Ingredient[];
  ingredientsForm: FormGroup;
  isSuggestionHovering: boolean;
  positionsArray: FormArray;
  positionFocused: number;

  constructor(
    private ingredientService: IngredientServiceProvider,
    private configService: ConfigProvider,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder)
  {}

  ngOnInit() {
    this.config = this.configService.getConfig();
    this.initIngredientsForm();
    this.completeIngredients = keyword => {
      return this.ingredientService.getIngredients();
    }
  }

  private initIngredientsForm() {
    this.positionsArray = new FormArray([]);
    for(var i = 1; i <= this.configService.get('numberOfDrinkPositions'); i++) {
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
      this.positionsArray.push(control);
    }
    this.ingredientsForm = this.formBuilder.group({
      positions: this.positionsArray
    });
  }

  clearSuggestions() {
    if (!this.isSuggestionHovering)
      this.positionFocused = null;
  }

  onFocus(position, event) {
    this.positionFocused = position;
    this.ingredientSuggestions = this.ingredientService.getIngredients(event.value);
  }

  ingredientSelected(ingredient, position) {
    this.isSuggestionHovering = false;
    this.positionFocused = null;
    this.ingredientSuggestions = [];
    this.positionsArray.at(position).patchValue(ingredient.name);
  }

  save() {
    if(this.ingredientsForm.invalid) return;

    const ingredients = this.ingredientsForm.get('positions').value.map(ingredient => {
      return this.ingredientService.getIngredientByName(ingredient);
    });
    this.configService.setConfig(this.config);
    this.ingredientService.setIngredients(ingredients);
    this.showToast('Settings successfully saved.');
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
