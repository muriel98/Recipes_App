import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookMarkView from './views/bookMarkView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    //Get the URL
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //Update to mark selected result
    resultsView.update(model.getSearchResultsPage());
    bookMarkView.update(model.state.bookmarks);

    //1. Load recipe
    await model.loadRecipe(id);

    //2. Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(`${err}`);
    console.error(err);
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

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookMarks(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);

  //Update view
  recipeView.update(model.state.recipe);

  //Render bookmark
  bookMarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookMarkView.render(model.state.bookmarks);
};

const init = function () {
  bookMarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
