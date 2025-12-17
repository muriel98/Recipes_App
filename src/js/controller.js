import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView.js';

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
    recipeView.renderError(`${err}`);
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
    resultsView.render(model.getSearchResultsPage(1));

    //Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {}
};

const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
