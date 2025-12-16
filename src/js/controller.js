import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    //Get the URL
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //1. Load recipe
    await model.loadRecipe(id);

    //2. Render recipe
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(`${err} miii error `);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //get query
    const query = searchView.getQuery();
    if (!query) return;

    //Load and render results
    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);
    console.log(model.state.search.results);
  } catch (err) {}
};

//controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
