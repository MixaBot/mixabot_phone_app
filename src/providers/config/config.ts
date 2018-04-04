import {Drink} from "../drinks/drink";

export interface Config {
  hostName: string;
  numberOfDrinkPositions: number;
  customDrinks: Drink[];
  positions: string[];
  isNative: boolean;
}

export class InvalidConfigPropertyError extends Error {
  constructor(propertyName: string) {
    super(propertyName);
    this.message = `Property ${propertyName} is not a valid configuration property.`
  }
}
