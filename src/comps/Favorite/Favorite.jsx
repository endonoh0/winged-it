import React, { useEffect, useState } from "react";


import { useVisualMode } from "../../hooks/useVisualMode";
import { useFirestoreFavorites } from '../../hooks/useFirestoreFavorites'
import { projectFirestore } from '../../firebase/config';

import FavoritePage from './index';

import Loading from "./Loading";
import Empty from "./Empty";

const SHOW = 'SHOW';
const LOADING = 'LOADING';
const EMPTY = 'EMPTY';

const Favorite = (props) => {


  const { docs, databasePromise } = useFirestoreFavorites ([]);
  const { mode, transition, back } = useVisualMode(LOADING);

    // Wait for the data to load and then show the recipe
  useEffect(() => {
    if(docs.length > 0) {
      transition(SHOW)
    }
    
  }, [docs.length]);


console.log(typeof databasePromise)
// databasePromise
// .then(() => {

// }) 

  

  
  return (
    <div>
      { mode === EMPTY && <Empty/> }
      { mode === LOADING && <Loading/> }
      { mode === SHOW &&
      <div>
        {
          docs.map((doc) => {
            return <FavoritePage key = {doc.id} doc = { doc }/> 
          })
        }
      </div>}
    </div>
    
    
  );
}

export default Favorite;