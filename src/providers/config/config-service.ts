import {Injectable} from '@angular/core';
import {Config, InvalidConfigPropertyError} from "./config";
import 'rxjs/add/operator/map';

export const MIXABOT_CONFIG = 'mixabotConfig';
const defaultConfig = {
  hostName: '10.0.0.185',
  numberOfDrinkPositions: 10,
  customDrinks: [],
  customIngredients: [],
  positions: []
};

@Injectable()
export class ConfigProvider {
  config: Config;

  constructor() {
    this.load();
  }

  load() {
    const savedConfig = JSON.parse(localStorage.getItem(MIXABOT_CONFIG));
    const isNative = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));
    this.config = {...defaultConfig, ...savedConfig, isNative};
  }

  get(propertyName: string) {
    this.load();
    if (propertyName in this.config) return this.config[propertyName];
    throw new InvalidConfigPropertyError(propertyName);
  }

  set(propertyName: string, propertyValue: any) {
    if (propertyName in this.config) {
      this.config[propertyName] = propertyValue;
      this.save();
    }
    else {
      throw new InvalidConfigPropertyError(propertyName);
    }
  }

  getConfig() {
    return {...this.config};
  }

  setConfig(config: Config) {
    this.config = config;
    this.save();
  }

  // Save configuration to local storage
  private save() {
    localStorage.setItem(MIXABOT_CONFIG, JSON.stringify(this.config));
  }
}
