import {NgModule} from "@angular/core";
import {AutoComplete} from "./auto-complete";
import {ToastService} from './toast-service';
import {IonicModule} from "ionic-angular";

@NgModule({
  imports: [
    IonicModule
  ],
  providers: [
    ToastService
  ],
  declarations: [
    AutoComplete
  ],
  exports: [
    AutoComplete
  ]
})
export class UtilModule {}
