import React, { useEffect, useState } from 'react';
import recipeSearch from '../helper/foodApi'

const Recipe = () => {

  //this is the ingredient array which this func gets as prop
  const ingredientsArray = ["chicken"];

  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await recipeSearch(ingredientsArray);
      setRecipeData(response);
    };
    fetchRecipeData();
  }, []);

  
  return (
    <div >

    </div>
  )
}

export default Recipe;
