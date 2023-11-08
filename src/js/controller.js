import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
// const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
};
init();
