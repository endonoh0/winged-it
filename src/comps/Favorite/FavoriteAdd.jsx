import React from "react";
import { projectFirestore } from '../../firebase/config';


const FavoriteAdd = (prop) => {

  const addFavoriteToDB = (type) => {

    // this email needs to be changed with current user
    const email = 'ghanbari@ualberta.ca';

    //This will come from the prop - this is just an example
    const favoriteRecipe = {
      user_email: email,
      recipe: {
        name: "Lasagna",
        img: "https://www.thewholesomedish.com/wp-content/uploads/2018/07/Best-Lasagna-550.jpg"
      }
    };

    projectFirestore.collection(type)
    .add(favoriteRecipe);
    
  }

  return (
    <div>
      <button onClick = { e => addFavoriteToDB('favorites') }> Favorite(example) </button>
    </div>
  )
}

export default  FavoriteAdd;