import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

if (module.hot) {
  module.hot.accept;
}
console.log("hello");

// const fetchingResult = async function () {
//   const res = await fetch(
//     `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca10`
//   );
//   const data = await res.json();
//   console.log(data);
// };
// fetchingResult();
fetch(
  `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca10`
);

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
    if (!query) return;

    // load search results
    await model.loadSearchResult(query);

    //Render results
    resultsView.render(model.getSearchResultPage());

    // render results per page

    paginationView.render(model.state.search);

    // resultsView._generateMarkup();
  } catch (err) {
    alert(err);
  }
};
const controllerPagination = function (goToPage) {
  //Render results
  resultsView.render(model.getSearchResultPage(goToPage));

  // render results per page

  paginationView.render(model.state.search);
};
// controllerSearchResults();
const init = function () {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerSearch(controllerSearchResults);
  paginationView.addHandlerClick(controllerPagination);
};
init();
