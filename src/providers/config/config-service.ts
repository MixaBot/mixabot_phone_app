import { Injectable } from '@angular/core';
import {Config, InvalidConfigPropertyError} from "./config";
import 'rxjs/add/operator/map';

export const MIXABOT_CONFIG = 'mixabotConfig';
const defaultConfig = {
  hostName: '10.0.0.185',
  numberOfDrinkPositions: 10
};

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {
  config: Config;

  constructor() {
    const savedConfig = JSON.parse(localStorage.getItem(MIXABOT_CONFIG));
    this.config = {...defaultConfig, ...savedConfig};
  }

  get(propertyName: string) {
    if (propertyName in this.config) return this.config[propertyName];
    throw new InvalidConfigPropertyError(propertyName);
  }

  set(propertyName: string, propertyValue: string) {
    if (propertyName in this.config) {
      this.config[propertyName] = propertyValue;
      this.save();
    }
    throw new InvalidConfigPropertyError(propertyName);
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
