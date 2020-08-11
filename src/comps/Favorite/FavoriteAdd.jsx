import React, { useState } from "react";
import { projectFirestore } from '../../firebase/config';

import { FaHeart } from "react-icons/fa";

const FavoriteAdd = (props) => {
  const {setFavoriteAlert} = props;

  const addFavoriteToDB = (type) => {
    setFavoriteAlert(true);
    const recipe = props.recipe.recipe;
    const email = props.user.email;

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
    <FaHeart
      className="favorite_btn"
      onClick={e => addFavoriteToDB('favorites')}
      size={50} />
  );
}

export default FavoriteAdd;
