export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc96e`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }

    console.log(res, data);

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
  } catch (err) {
    alert(err);
  }
};
