import 'rxjs/add/operator/debounceTime';
import {Component} from '@angular/core';
import {Hotspot, HotspotDevice, HotspotNetwork} from '@ionic-native/hotspot';
import {ModalController} from "ionic-angular";

import {IngredientServiceProvider} from "../../providers/ingredients/ingredient-service";
import {ConfigProvider} from "../../providers/config/config-service";
import {Config} from "../../providers/config/config";
import {CreateDrinkPage} from "../create-drink/create-drink";
import {ToastService} from "../../util/toast-service";

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})
export class SetupPage {
  config: Config;
  currentSuggestion: number;
  ingredientSuggestions: string[];
  initialIngredientNames: string[];
  networks: HotspotNetwork[];
  devices: HotspotDevice[];
  suggestionLimit: number;

  constructor(
    private ingredientService: IngredientServiceProvider,
    private configService: ConfigProvider,
    private modal: ModalController,
    private toastService: ToastService,
    private hotspot: Hotspot)
  {}

  ngOnInit() {
    this.config = this.configService.getConfig();
    this.currentSuggestion = -1;
    this.suggestionLimit = 5;
    this.initialIngredientNames = [];
    this.loadIngredientSuggestions();
    this.initIngredientsForm();
  }

  private initIngredientsForm() {
    for(let i = 0; i < this.configService.get('numberOfDrinkPositions'); i++) {
      this.initialIngredientNames[i] = this.config.positions[i] || '';
    }
  }

  createDrink() {
    let newDrinkModal = this.modal.create(CreateDrinkPage);
    newDrinkModal.onDidDismiss(success => {
      if(success) {
        this.loadIngredientSuggestions();
      }
    });
    newDrinkModal.present();
  }

  showNetworks() {
    this.hotspot.createHotspot('SirMixABot-Setup', 'WPA_PSK', '1234').then(() => {
      return this.hotspot.startHotspot();
    }).then(on => {
      console.log('on' ,on);
      return this.hotspot.getAllHotspotDevices();
    }).then((hotspotDevices: HotspotDevice[]) => {
      console.log('devices', hotspotDevices);
      this.devices = hotspotDevices;
      return this.hotspot.isAvailable();
    }).then(is => {
      console.log('is', is);
      return this.hotspot.isHotspotEnabled();
    }).then(enabled => {
      console.log('enabled', enabled);
    }).catch(e => {
      console.log('Error', e);
    });
  }

  ingredientSelected(ingredientName, position) {
    this.config.positions[position] = ingredientName;
  }

  save() {
    const ingredients = this.config.positions.map((ingredient) => {
      return this.ingredientService.getIngredientByName(ingredient);
    });
    this.configService.setConfig(this.config);
    this.ingredientService.setIngredients(ingredients);

    this.toastService.showToast('Settings successfully saved.');
  }

  private loadIngredientSuggestions() {
    this.ingredientSuggestions = this.ingredientService.getIngredients().map(ingredient => ingredient.name);
  }
}
