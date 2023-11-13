import { API_URL, START_PAGE } from "./config.js";
import { getJSON } from "./helper.js";
export const state = {
  recipe: {},

  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: START_PAGE,
  },
  bookmark: [],
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
  // console.log(state.recipe);
  if (state.bookmark.some((bookmark) => bookmark.id === id)) {
    state.recipe.bookmarked = true;
  } else state.recipe.bookmarked = false;
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
export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
export const addBookmark = function (recipe) {
  state.bookmark.push(recipe);
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
};

// delete bookmark
export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex((el) => el.id === id);
  state.bookmark.splice(index, 1);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
};
