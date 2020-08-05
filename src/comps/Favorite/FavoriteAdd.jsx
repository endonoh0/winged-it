import React from "react";
import { FiHeart } from "react-icons/fi";

import { projectFirestore } from '../../firebase/config';


const FavoriteAdd = (props) => {

  const addFavoriteToDB = (type) => {

    const recipe = props.recipe.recipe;

    // this email needs to be changed with current user
    const email = 'ghanbari@ualberta.ca';
    console.log(recipe)
    //This will come from the prop - this is just an example
    const favoriteRecipe = {
      user_email: email,
      recipe: {
        name: recipe.label,
        img: recipe.image,
        ...recipe
      }
      
    };

    projectFirestore.collection(type)
    .add(favoriteRecipe);
    
  }
  
  return (
    <div>
      <button className="btn_heart" onClick = { e => addFavoriteToDB('favorites') }> <FiHeart /> </button>
    </div>
  )
}

export default  FavoriteAdd;