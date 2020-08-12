import React, { useEffect, useState, Fragment } from 'react';

/* Custom Hooks */
import { useVisualMode } from '../hooks/useVisualMode';
import { useFirestoreFavorites } from '../hooks/useFirestoreFavorites'

/* Firestore */
import { projectFirestore } from '../firebase/config';

/* Bootstrap */
import Card from  'react-bootstrap/Card';

/* Comps */
import FavoritePage from './Favorite/index';
import Loading from './Favorite/Loading';

/* Styles */
import './Favorite.scss';

const SHOW = 'SHOW';
const LOADING = 'LOADING';
const EMPTY = 'EMPTY';

// "Favorite page "/favorites"
const Favorite = ({setSelectedImg, user}) => {
  const { docs, dataFetchStatus } = useFirestoreFavorites (user);
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
  }, [dataFetchStatus, favItems.length])

  // Delete favorite
  function deleteEvent (index, docId) {
    const docs = [...favItems]
    docs.splice(index, 1);
    setFavItems(docs);
    projectFirestore.collection('favorites').doc(docId).delete();
  }

  function save(value) {
    const index = editDoc[0];
    const docId = editDoc[1];

    //this part of code updates the database
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
		<Fragment>

      {/* Banner Header */}
			<div className="seasonal_banner">
				<div className="seasonal_revealer">
					<h1 className="banner_content" id="seasonal_title">Favorites</h1>
					<article className="banner_description favorite">
						<p className="banner_content" id="description">
							Re-explore your favorite meals and remember why you fell in love with these recipes in the first place!
						</p>
					</article>
				</div>
				<img className="banner_left" src="./fav.jpg" alt="Ingredient banner"/>
      </div>

      {/* Save and Edit Favorites */}
			<section className="seasonal_container">
				<article className="grids_container">
					{mode === LOADING &&
						<Loading />
					}
					{mode === SHOW &&
						favItems.map((favItem, index) => {
              return(
								<Card className="grid__card" style ={{width: '18rem'}}>
                <FavoritePage
                save = { save }
                doc = { favItem }
                index = { index }
                setSelectedImg = {setSelectedImg}
                deleteEvent = { e => deleteEvent(index, favItem.id)}
                setEditDoc = {setEditDoc}
                />
								</Card>
              )
              })}
				</article>
			</section>
    </Fragment>)
}

export default Favorite;
