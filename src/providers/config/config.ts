export interface Config {
  hostName: string,
  numberOfDrinkPositions: number,
  positions: string[];
  isNative: boolean;
}

export class InvalidConfigPropertyError {
  message: string;
  constructor(propertyName: string) {
    this.message = `Property ${propertyName} is not a valid configuration property.`
  }
}
