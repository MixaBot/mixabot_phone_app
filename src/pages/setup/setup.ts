import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DrinkServiceProvider } from '../../providers/drink-service/drink-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private drinkService: DrinkServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupPage');
    this.hostName = '10.0.0.185';
  }

  setIngredients() {
    const ingredientPositions = [
      {name: 'Vodka', position: 2},
      {name: 'Gin', position: 4}
    ];
    this.drinkService.setIngredients(ingredientPositions)
      .subscribe(response => {
        if (response.error) console.log(response);
      });
  }
}
