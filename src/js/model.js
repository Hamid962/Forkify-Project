import { API_URL } from "./config.js";
import { getJSON } from "./helper.js";
export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  const data = await getJSON(`${API_URL}${id}`);

  const { recipe } = data.data;
  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    cookingTime: recipe.cooking_time,
    servings: recipe.servings,
  };
  console.log(state.recipe);
};
