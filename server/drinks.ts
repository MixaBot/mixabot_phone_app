/*
 This code does not run in the client browser.
 This is an example of a node script that can be run on a server
 or simply via a command line when developing.
*/
const fs = require('fs');
const ingredients = require('../src/assets/data/ingredients.json').result;
const drinks = require('../src/assets/data/drinks.json');

const ingredientsToFind = ['vodka', 'gin', 'rum', 'whiskey', 'gin', 'tequila', 'liqueur', 'liquor'];

// Find drinks that contain keywords
const foundIngredients = ingredients.filter(ing => {
  return ingredientsToFind.some(itf => {
    return ing.name.toLowerCase().indexOf(itf) > -1;
  });
});

// fs.writeFile('updated-drinks-2.json', JSON.stringify(foundIngredients, null, 2));

// Replace drink ingredients with new ingredient
updateDrinkIngredient('absolut-vodka', 'vodka');
updateDrinkIngredient('level-vodka', 'vodka');
updateDrinkIngredient('williams-pear-liqueur', 'pear-liqueur');

function updateDrinkIngredient(id, newId) {
  drinks.result.forEach(drink => {
    const foundIngredient = drink.ingredients.find(ingredient => ingredient.id == id);
    if (foundIngredient) {
      foundIngredient.id = newId;
    }
  });
}

fs.writeFile('drinks.json', JSON.stringify(drinks));
