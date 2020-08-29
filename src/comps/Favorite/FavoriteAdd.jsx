import React, { useState } from "react";
import classNames from "classnames";

/* Firestore */
import { projectFirestore } from '../../firebase/config';

/* Bootstrap */
import { FaHeart } from "react-icons/fa";

/* Styles */
import "./FavoriteAdd.scss";

const FavoriteAdd = (props) => {
  const { setFavoriteAlert, setAlertMessage, setIsFavorited, isFavorited, setFavoriteId, favoriteId } = props;

  const [id, setId] = useState(favoriteId);
  const [buttonClass, setButtonClass] = useState(isFavorited);
  const [ favorite, setFavorite ] = useState(isFavorited);

  const toggleFavorite = (bool) => {
    setFavorite(bool);
    setIsFavorited(bool);
    setButtonClass(bool);
    setFavoriteAlert(true);
  }

  // Delete favorite in database
  const deleteFavoriteFromDB = () => {
    toggleFavorite(false);
    setAlertMessage("Recipe Unfavorited");
    projectFirestore.collection('favorites').doc(id).delete();
  }

  // Store a new favorite in the database.
  const addFavoriteToDB = (type) => {
    toggleFavorite(true);
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
      setFavoriteId(doc.id);
      setId(doc.id);
      console.log('document ID added to database: ', doc.id);
    })
    .catch(function (error) {
      console.log('error', error);
    });
  }

  const favoriteAddClass = classNames(props.className, {
    'favorited': favorite
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
