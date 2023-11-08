import { API_URL } from "./config.js";
import { getJSON } from "./helper.js";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
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
export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};
