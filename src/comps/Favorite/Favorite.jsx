import React, { useEffect, useState } from "react";

import { useVisualMode } from "../../hooks/useVisualMode";
import { useFirestoreFavorites } from '../../hooks/useFirestoreFavorites'
import { projectFirestore } from '../../firebase/config';

import FavoritePage from './index';

import Loading from "./Loading";
import Empty from "./Empty";
import Edit from "./Edit";

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

    projectFirestore.collection('favorites').doc(editDoc[1]).update(
      {recipe: {...favItems[editDoc[0]].recipe,
        name: value
      }}
    );
    
    const foo = {...favItems[editDoc[0]], recipe: {...favItems[editDoc[0]].recipe, name:value}};
    let bar = [...favItems];
    bar[editDoc[0]] = foo;
    
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