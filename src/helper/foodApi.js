const requestPromise = require('request-promise');

// this function receive ingredients in an array and return the promise with api search results
const recipeSearch = (ingredients, healthFilter, dietFilter) => {


  let healthSelection = healthFilter.map(filter => filter.value).map(el => '&Health=' + el).join("");


  const apiInfo = {
    edamamRecipeDatabase: {
      apiKey: process.env.REACT_APP_EDAMAM_API_KEY_RECIPE,
      applicationID: process.env.REACT_APP_EDAMAM_APPLICATION_ID_RECIPE
    }
  };

  const edamamRecipeUrl =
  `https://api.edamam.com/search?q=${ingredients}&app_id=${apiInfo.edamamRecipeDatabase.apiKey}&app_key=${apiInfo.edamamRecipeDatabase.applicationID}${healthSelection}&Diet=${dietFilter}`;


  return requestPromise(edamamRecipeUrl)
  .then (function (data) {

    // this return 10 recipes in an array and if it can not find anything, return null
    const parsedData = JSON.parse(data);
    return parsedData.hits;

  })
  .catch(err => {
    console.log(err);
  })

};

export default recipeSearch;
