import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DrinkServiceProvider, IngredientPositions } from '../../providers/drink-service/drink-service';

/**
 * Generated class for the SetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
  providers: [DrinkServiceProvider]
})
export class SetupPage {
  hostName: string;
  numPositions: number;
  ingredients: IngredientPositions[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private drinkService: DrinkServiceProvider) {
    this.numPositions = 10;
    this.hostName = '10.0.0.185';
    this.ingredients = [];
    for(var i = 1; i <= this.numPositions; i++) {
      this.ingredients.push({position: i, name: ''});
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupPage');
  }

  setIngredients() {
    this.drinkService.setIngredients(this.ingredients)
      .subscribe(response => {
        if (response.error) console.log(response);
      });
  }
}
