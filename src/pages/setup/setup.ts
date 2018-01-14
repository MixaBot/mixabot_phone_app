import 'rxjs/add/operator/debounceTime';
import {Component} from '@angular/core';
import {Hotspot, HotspotNetwork} from '@ionic-native/hotspot';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';

import {IngredientServiceProvider} from "../../providers/ingredients/ingredient-service";
import {Ingredient} from "../../providers/ingredients/ingredient";
import {ConfigProvider} from "../../providers/config/config-service";
import {Config} from "../../providers/config/config";
import {ToastController} from "ionic-angular";

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})
export class SetupPage {
  config: Config;
  currentSuggestion: number;
  ingredientSuggestions: Ingredient[];
  ingredientsForm: FormGroup;
  isSuggestionHovering: boolean;
  networks: HotspotNetwork[];
  positionsArray: FormArray;
  positionFocused: number;
  suggestionLimit: number;

  constructor(
    private ingredientService: IngredientServiceProvider,
    private configService: ConfigProvider,
    private toastCtrl: ToastController,
    private hotspot: Hotspot,
    public formBuilder: FormBuilder)
  {}

  ngOnInit() {
    this.config = this.configService.getConfig();
    this.currentSuggestion = -1;
    this.suggestionLimit = 5;
    this.initIngredientsForm();
  }

  private initIngredientsForm() {
    this.positionsArray = new FormArray([]);
    for(let i = 0; i < this.configService.get('numberOfDrinkPositions'); i++) {
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
      if (this.config.positions[i]) control.setValue(this.config.positions[i]);
      this.positionsArray.push(control);
    }
    this.ingredientsForm = this.formBuilder.group({
      positions: this.positionsArray
    });
  }

  showNetworks() {
    this.hotspot.scanWifi().then((networks: HotspotNetwork[]) => {
      this.networks = networks;
    });
  }

  clearSuggestions() {
    this.positionFocused = null;
    this.currentSuggestion = -1;
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
    this.config.positions[position] = ingredient.name;
  }

  onKeypress(key) {
    switch(key) {
      case 'ArrowDown':
        this.currentSuggestion = (this.currentSuggestion + 1) % this.suggestionLimit;
        break;
      case 'ArrowUp':
        this.currentSuggestion = (this.currentSuggestion - 1) % this.suggestionLimit;
        break;
      case 'Enter':
        this.ingredientSelected(this.ingredientSuggestions[this.currentSuggestion], this.positionFocused);
        break;
    }
  }

  save() {
    if(this.ingredientsForm.invalid) return;

    const ingredients = this.ingredientsForm.get('positions').value.map(ingredient => {
      return this.ingredientService.getIngredientByName(ingredient);
    });
    this.positionsArray.getRawValue().forEach((pos, i) => this.config[i] = pos);
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
