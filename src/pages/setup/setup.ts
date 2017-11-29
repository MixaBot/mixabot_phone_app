import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DrinkServiceProvider, IngredientPositions } from '../../providers/drink-service/drink-service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

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
  }

  ngOnInit() {
    this.initIngredientsForm();
  }

  private initIngredientsForm() {
    const positionsArray = new FormArray([]);
    for(var i = 1; i <= this.numPositions; i++) {
      const control = new FormControl('', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*')])) as FormControl;
      control.valueChanges.debounceTime(500).subscribe(ingredient => {
        this.drinkService.searchIngredients(ingredient).subscribe(response => {
          console.log(response);
        });
      });
      positionsArray.push(control);
    }
    this.ingredientsForm = this.formBuilder.group({
      positions: positionsArray
    });
  }

  setIngredients() {
    if(this.ingredientsForm.invalid) return;

    this.drinkService.setIngredients(this.ingredients)
      .subscribe(response => {
        if (response.error) console.log(response);
      });
  }
}
