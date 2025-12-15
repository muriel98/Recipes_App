import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

//////////////////////////////////////////////

const controlRecipes = async function () {
  try {
    //Get the URL
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //1. Load recipe
    await model.loadRecipe(id);

    //2. Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
