import React from "react";
import "./FavoriteItems.scss";

// This component shows the  items in favorite table
// The component is passed to index.jsx in the same folder

// ****** View Recipe needs to be implemented *******
const FavoriteItems = (props) => {

  return (

    <div>
      
          <div key = {props.doc.id} className="favorite">
            <a>
              <img src={ props.doc.recipe.img } alt="Cinque Terre" width="600" height="400"/>
            </a>
            <div className="desc">{ props.doc.recipe.name }</div>
            <button> View Recipe </button>
            <button onClick = { e => props.deleteEventReq() }>
              Delete fav
            </button>
          </div>
      
      
    </div>
   
  );
};

export default FavoriteItems;
