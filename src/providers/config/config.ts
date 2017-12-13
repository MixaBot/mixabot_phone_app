export interface Config {
  hostName: string,
  numberOfDrinkPositions: number
}

export class InvalidConfigPropertyError {
  message: string;
  constructor(propertyName: string) {
    this.message = `Property ${propertyName} is not a valid configuration property.`
  }
}
