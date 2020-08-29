import React, { useState } from "react";
import classNames from "classnames";

/* Firestore */
import { projectFirestore } from '../../firebase/config';

/* Bootstrap */
import { FaHeart } from "react-icons/fa";

/* Styles */
import "./FavoriteAdd.scss";

const FavoriteAdd = (props) => {
  const [id, setId] = useState("");
  const [buttonClass, setButtonClass] = useState(false);

  const {setFavoriteAlert, setAlertMessage} = props;

  // Delete favorite in database.
  const deleteFavoriteFromDB = () => {
    setButtonClass(false);
    setFavoriteAlert(true);
    setAlertMessage("Recipe Unfavorited");
    projectFirestore.collection('favorites').doc(id).delete();
  }

  // Store a new favorite in the database.
  const addFavoriteToDB = (type) => {
    setButtonClass(true);
    setFavoriteAlert(true);
    setAlertMessage("Recipe Favorited");

    const recipe = props.recipe.recipe;
    const email = props.user.email;

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
    .add(favoriteRecipe)
    .then(function (doc) {
      console.log('id', doc.id);
      setId(doc.id);
    })
    .catch(function (error) {
      console.log('error', error);
    });
  }

  const favoriteAddClass = classNames(props.className, {
    'favorited': buttonClass
  });

  return (
    <FaHeart
      className={favoriteAddClass}
      onClick={e => buttonClass ? deleteFavoriteFromDB() : addFavoriteToDB('favorites')}
      size={32}
      />
  );
}

export default FavoriteAdd;
