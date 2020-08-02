import React from "react";
import "./Favorite.scss";
import useFirestoreFavorites from '../../hooks/useFirestoreFavorites'


const Favorite = () => {

  const { docs } = useFirestoreFavorites ('favorites');

  return (

    <div>
    
    { docs.map(doc => {
      return (
        <div key = {doc.id} className="favorite">
          <a>
            <img src={ doc.recipe.img } alt="Cinque Terre" width="600" height="400"/>
          </a>
          <div className="desc">{ doc.recipe.name }</div>
          <button>
            View Recipe
          </button>
        </div>)
      })
    }
      
    </div>
   
  );
};
export default Favorite;
