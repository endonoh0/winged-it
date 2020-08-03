import React from "react";
import "./Favorite.scss";

// This component shows the  items in favorite table
// The component is passed to index.jsx in the same folder

// ****** View Recipe needs to be implemented *******
const FavoriteItems = (props) => {

  return (

    <div>
      { props.docs.map(doc => {
        return (
          <div key = {doc.id} className="favorite">
            <a>
              <img src={ doc.recipe.img } alt="Cinque Terre" width="600" height="400"/>
            </a>
            <div className="desc">{ doc.recipe.name }</div>
            <button> View Recipe </button>
            <button onClick = { e => props.deleteFav( doc.id )}>
              Delete fav
            </button>
          </div>)
        })
      }
    </div>
   
  );
};

export default FavoriteItems;
