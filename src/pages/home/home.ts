import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DrinkServiceProvider } from '../../providers/drink-service/drink-service';
import { home as homeText } from '../../lang/en';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DrinkServiceProvider]
})
export class HomePage {
  drinks: any;
  hostName: string;

  constructor(public navCtrl: NavController,
              private drinkService: DrinkServiceProvider,
              private toastCtrl: ToastController) {
    this.hostName = '10.0.0.185';
  }

  getDrinks() {
    if (!this.hostName) {
      this.showToast(homeText.errors.emptyHostName);
      return;
    }
    this.drinkService.getDrinks(this.hostName).subscribe(response => {
      this.drinks = response.drinks;
      console.log(this.drinks);
    }, error => {
      this.showToast(homeText.errors.getDrinks);
      console.log(error);
    });
  }

  getDrinksTest() {
    this.drinkService.getDrinksTest().subscribe(response => {
      this.drinks = response.drinks;
    }, error => {
      this.showToast(error);
    });
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
