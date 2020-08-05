import React, { useEffect, useState } from "react";

import { useVisualMode } from "../hooks/useVisualMode";
import { useFirestoreFavorites } from '../hooks/useFirestoreFavorites'
import { projectFirestore } from '../firebase/config';

import FavoritePage from './Favorite/index';
import Loading from "./Favorite/Loading";
import Empty from "./Favorite/Empty";
import Edit from "./Favorite/Edit";

const SHOW = 'SHOW';
const LOADING = 'LOADING';
const EMPTY = 'EMPTY';
const EDIT = 'EDIT';

const Favorite = (props) => {

  
  const { docs, dataFetchStatus } = useFirestoreFavorites ([]);
  const { mode, transition, back } = useVisualMode(LOADING);
  const [favItems, setFavItems] = useState([]);
  const [editDoc, setEditDoc] = useState([]);


  // Wait for the data to load and then show the recipe
  useEffect(() => {
    if(docs.length > 0) {
      setFavItems(docs);
      transition(SHOW)
    }
    
  }, [docs.length]);

//transition to empty page in case there is no favorite
  useEffect(() => {
    if(favItems.length === 0 && dataFetchStatus) {
      transition(EMPTY)
    }
  },[dataFetchStatus, favItems.length])

  //delete favorite
  function deleteEvent (index, docId) {
    const docs = [...favItems]
    docs.splice(index, 1);
    setFavItems(docs);
    projectFirestore.collection('favorites').doc(docId).delete();
  }

  //edit favorite
  function editEvent(index, docId) {
    setEditDoc([index, docId]);
    transition(EDIT);
  }

  function save(value) {
    const index = editDoc[0];
    const docId = editDoc[1];

    //this part of code update the database
    projectFirestore.collection('favorites').doc(docId).update(
      {recipe: {...favItems[index].recipe,
        name: value
      }}
    );
    
    //this part of code update the state when edited
    const foo = {...favItems[index], recipe: {...favItems[index].recipe, name:value}};
    let bar = [...favItems];
    bar[index] = foo;
    
    setFavItems(bar);

    transition(SHOW);
  }

  

  return (
    <div>
      { mode === EDIT && <Edit
        onSave={ save }
        onCancel={ back }
        editPlaceholder = { favItems[editDoc[0]].recipe.name } /> }
      { mode === EMPTY && <Empty/> }
      { mode === LOADING && <Loading/> }
      { mode === SHOW &&
      <div>
        {
          favItems.map((favItem, index) => {
            return <FavoritePage 
            key = { favItem.id }
            doc = { favItem }
            deleteEvent = { e => deleteEvent(index, favItem.id)}
            editEvent = { e => editEvent(index, favItem.id) }/> 
          })
        }
      </div>}
    </div>
    
  );
}

export default Favorite;