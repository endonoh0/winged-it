import React from "react";
import { FaHeart } from "react-icons/fa";

import { projectFirestore } from '../../firebase/config';


const FavoriteAdd = (props) => {

  const addFavoriteToDB = (type) => {

    const recipe = props.recipe.recipe;

    // this email needs to be changed with current user
    const email = 'ghanbari@ualberta.ca';
    console.log(recipe)
    //This will come from the prop - this is just an example
    const favoriteRecipe = {
      created_at: new Date(),
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
    <FaHeart className="favorite_btn" onClick = { e => addFavoriteToDB('favorites') } size={50} />
  )
}

export default  FavoriteAdd;