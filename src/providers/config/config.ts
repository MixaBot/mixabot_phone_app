import {Drink} from "../drinks/drink";
import {Ingredient} from "../ingredients/ingredient";

export interface Config {
  hostName: string;
  numberOfDrinkPositions: number;
  customDrinks: Drink[];
  customIngredients: Ingredient[];
  positions: string[];
  isNative: boolean;
}

export class InvalidConfigPropertyError extends Error {
  constructor(propertyName: string) {
    super(propertyName);
    this.message = `Property ${propertyName} is not a valid configuration property.`
  }
}
