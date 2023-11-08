import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

if (module.hot) {
  module.hot.accept;
}

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    await model.loadRecipe(id);
    // recipeView.renderSpinner();
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controllerSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // search results
    const query = searchView.getQuery();

    // render results
    await model.loadSearchResult(query);
    console.log(model.state.search.results);

    resultsView.render(model.state.search.results);
    resultsView._generateMarkup();
  } catch (err) {
    console.log(err);
  }
};
// controllerSearchResults();
const init = function () {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerSearch(controllerSearchResults);
};
init();
