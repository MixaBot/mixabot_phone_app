import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DrinkServiceProvider } from '../../providers/drink-service/drink-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DrinkServiceProvider]
})
export class HomePage {
  drinks: any;
  drinkError: boolean;
  time: string;

  constructor(public navCtrl: NavController, private drinkService: DrinkServiceProvider ) {

  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe(response => {
      this.drinkError = false;
      this.drinks = response.drinks;
      console.log(this.drinks);
    }, error => {
      this.drinkError = true;
    });
  }

  getTime() {
    this.drinkService.getTime().subscribe(response => {
      this.time = response.time;
    })
  }
}
