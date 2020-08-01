const requestPromise = require('request-promise');

// this function receive ingredients in an array and return the promise with api search results
const recipeSearch = (ingredients) => {

  const apiInfo = {
    edamamRecipeDatabase: {
      apiKey: "1b1088b3",
      applicationID: "0981a1a2b74f3547b529351748da57c2"
    }
  };
 

  const edamamRecipeUrl = 
  `https://api.edamam.com/search?q=${ingredients}&app_id=${apiInfo.edamamRecipeDatabase.apiKey}&app_key=${apiInfo.edamamRecipeDatabase.applicationID}`;
  

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
