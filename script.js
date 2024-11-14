document.addEventListener("DOMContentLoaded", function () {
  const recipeList = document.getElementById("recipes");
  const recipeDetails = document.getElementById("recipe-details");
  const recipeName = document.getElementById("recipe-name");
  const recipeImage = document.getElementById("recipe-image");
  const description = document.getElementById("recipe-description");
  const prepTime = document.getElementById("prep-time");
  const cookTime = document.getElementById("cook-time");
  const servings = document.getElementById("servings");
  const difficulty = document.getElementById("difficulty");
  const calories = document.getElementById("calories");
  const protein = document.getElementById("protein");
  const carbohydrates = document.getElementById("carbohydrates");
  const fat = document.getElementById("fat");
  const tagList = document.getElementById("tag-list");
  const ingredientsList = document.getElementById("ingredients-list");
  const instructionsList = document.getElementById("instructions-list");
  const doubleServingsBtn = document.getElementById("double-servings");
  const convertUnitsBtn = document.getElementById("convert-units");

  let recipesData = [];

  fetch("recipes.json")
    .then(response => response.json())
    .then(data => {
      recipesData = data;
      populateRecipeList(data);
    });

  function populateRecipeList(recipes) {
    recipes.forEach(recipe => {
      const recipeItem = document.createElement("li");
      recipeItem.textContent = recipe.name;
      recipeItem.addEventListener("click", function () {
        displayRecipeDetails(recipe);
      });
      recipeList.appendChild(recipeItem);
    });
  }

  function displayRecipeDetails(recipe) {
    recipeDetails.classList.remove("hidden");

    recipeName.textContent = recipe.name;
    recipeImage.src = `images/${recipe.image}`;
    recipeImage.alt = `${recipe.name} image`;

    description.textContent = recipe.description;

    prepTime.textContent = formatTime(recipe.prepTime);
    cookTime.textContent = formatTime(recipe.cookTime);
    servings.textContent = recipe.servings;
    difficulty.textContent = recipe.difficulty;

    calories.textContent = recipe.nutritionalInfo.calories;
    protein.textContent = recipe.nutritionalInfo.protein;
    carbohydrates.textContent = recipe.nutritionalInfo.carbohydrates;
    fat.textContent = recipe.nutritionalInfo.fat;

    tagList.innerHTML = "";
    recipe.tags.forEach(tag => {
      const tagItem = document.createElement("li");
      tagItem.textContent = tag;
      tagList.appendChild(tagItem);
    });

    ingredientsList.innerHTML = "";
    recipe.ingredients.forEach(ingredient => {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = `${ingredient.item} ${ingredient.amount} ${ingredient.unit}`;
      ingredientsList.appendChild(ingredientItem);
    });

    instructionsList.innerHTML = "";
    recipe.instructions.forEach(step => {
      const stepItem = document.createElement("li");
      stepItem.textContent = `Step ${step.step}: ${step.text}`;
      instructionsList.appendChild(stepItem);
    });

    doubleServingsBtn.onclick = () => doubleServings(recipe);
    convertUnitsBtn.onclick = () => convertUnits(recipe);
  }

  function doubleServings(recipe) {
    recipe.ingredients.forEach(ingredient => {
      ingredient.amount *= 2;
    });
    displayRecipeDetails(recipe);
  }

  function convertUnits(recipe) {
    recipe.ingredients.forEach(ingredient => {
      if (ingredient.unit === "grams") {
        ingredient.amount = (ingredient.amount * 0.0022).toFixed(2);
        ingredient.unit = "pounds";
      } else if (ingredient.unit === "cups") {
        ingredient.amount = (ingredient.amount * 0.24).toFixed(2);
        ingredient.unit = "liters";
      }
    });
    displayRecipeDetails(recipe);
  }

  function formatTime(timeInMinutes) {
    if (timeInMinutes >= 60) {
      const hours = Math.floor(timeInMinutes / 60);
      const minutes = timeInMinutes % 60;
      return `${hours} hour(s) ${minutes} minute(s)`;
    }
    return `${timeInMinutes} minute(s)`;
  }

  const yearSpan = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
});
