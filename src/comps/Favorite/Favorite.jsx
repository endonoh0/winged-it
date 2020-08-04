import React, {useEffect, useState} from "react";
import "./Favorite.scss";
import { useFirestoreFavorites } from '../../hooks/useFirestoreFavorites'
import { projectFirestore } from '../../firebase/config';


const Favorite = () => {

  
  let dynamicDeleting = {}

  const deleteFav = (docId) => {
    dynamicDeleting = projectFirestore.collection('favorites').doc(docId).delete();
  }

  const { docs } = useFirestoreFavorites (dynamicDeleting);



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
          <button onClick = { e => deleteFav( doc.id )}>
            Delete fav
          </button>
        </div>)
      })
    }
      
    </div>
   
  );
};
export default Favorite;
