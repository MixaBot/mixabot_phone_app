import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";

@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) {}

  showToast(message: string, position: string = 'top') {
    this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'top',
      showCloseButton: true
    }).present();
  }
}
