import {Ingredient} from "../ingredients/ingredient";

export interface Drink {
  description?: string,
  isAlcoholic?: boolean,
  isCarbonated?: boolean,
  isHot?: boolean,
  ingredients?: Ingredient[],
  name?: string,
  id: string
}
