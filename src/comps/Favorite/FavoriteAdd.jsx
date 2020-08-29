import React, { useState } from "react";
import classNames from "classnames";
import { projectFirestore } from '../../firebase/config';

import "./FavoriteAdd.scss";

import { FaHeart } from "react-icons/fa";

const FavoriteAdd = (props) => {
  const [buttonClass, setButtonClass] = useState(false);

  const {setFavoriteAlert} = props;

  const addFavoriteToDB = (type) => {
    setButtonClass(true);
    setFavoriteAlert(true);

    const recipe = props.recipe.recipe;
    const email = props.user.email;

    // Store a new favorite in the database.
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

  const favoriteAddClass = classNames(props.className, {
    'favorited': buttonClass
  });

  return (
    <FaHeart
      className={favoriteAddClass}
      onClick={e => addFavoriteToDB('favorites')}
      size={32}
      />
  );
}

export default FavoriteAdd;
