import React, { useEffect, useState, Fragment } from 'react';
import { motion } from 'framer-motion';

import { useVisualMode } from '../hooks/useVisualMode';
import { useFirestoreFavorites } from '../hooks/useFirestoreFavorites'
import { projectFirestore } from '../firebase/config';

import Card from  'react-bootstrap/Card'
import FavoritePage from './Favorite/index';
import Loading from './Favorite/Loading';
import Empty from './Favorite/Empty';
import Edit from './Favorite/Edit';
import TitleFav from './Favorite/TitleFav'

import './Favorite.scss'

const SHOW = 'SHOW';
const LOADING = 'LOADING';
const EMPTY = 'EMPTY';
const EDIT = 'EDIT';

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
  },[dataFetchStatus, favItems.length])

  //delete favorite
  function deleteEvent (index, docId) {
    const docs = [...favItems]
    docs.splice(index, 1);
    setFavItems(docs);
    projectFirestore.collection('favorites').doc(docId).delete();
  }

  //edit favorite
  // function editEvent(index, docId) {
  //   console.log(index, docId);
  //   setEditDoc([index, docId]);
  //   transition(EDIT);
  // }

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
		<Fragment>
			<div className="seasonal_banner">
				<div className="seasonal_revealer">
					<h1 className="banner_content" id="seasonal_title">Favorites</h1>
					<article className="banner_description">
						{/* <h2 className="banner_content" id="month">{MONTHS[month]}</h2> */}
						<p className="banner_content" id="description">
							Re-explore your favorite meals and remember why you fell in love with these recipes in the first place!
						</p> 
					</article>
				</div>
				<img className="banner_left" src="./ingredient-banner.jpg" alt="Ingredient banner"/>
			</div>
			<section className="seasonal_container">
				<article className="grids_container">
					{mode === LOADING &&
						<Loading />
					}
          {/* {mode === EDIT && 
            <Fragment>
              <TitleFav message= "Edit Your Recipe" />
              <Edit
              onSave={ save }
              onCancel={ back }
              editPlaceholder = { favItems[editDoc[0]].recipe.name } />
            </Fragment>
          } */}
					{mode === SHOW &&
						favItems.map((favItem, index) => {
              // <Link className="ingredient" to="/">
              return(
								<Card className="grid__card" style ={{width: '18rem'}}>
                <FavoritePage
                save = { save }
                doc = { favItem }
                setSelectedImg = {setSelectedImg}
                deleteEvent = { e => deleteEvent(index, favItem.id)}
                setEditDoc = {setEditDoc}
                /> 
									{/* <Card.Img className="grid__img" variant="top" src={favItem.recipe.img} />
									<Card.Title className="grid__title" >{favItem.recipe.label}</Card.Title> */}
								</Card>
              // </Link>
              )
              })}
				</article>
			</section>
    </Fragment>)
    

  // return (
  //   <div className="favorite__container">
  //     { mode === EDIT && 
  //       <Fragment>
  //         <TitleFav message= "Edit Your Recipe" />
  //         <Edit
  //         onSave={ save }
  //         onCancel={ back }
  //         editPlaceholder = { favItems[editDoc[0]].recipe.name } />
  //       </Fragment>
  //       }
  //     { mode === EMPTY && <div>
  //       <TitleFav message= "Favorite List" />
  //       <Empty/>
  //     </div> }
  //     { mode === LOADING && 
  //       <div>
  //         <TitleFav message= "Favorite List" />
  //         <Loading/>
  //       </div>
  //        }
  //     { mode === SHOW &&
  //     <Fragment>
  //       <TitleFav message= "Favorite List" />
  //       <div className="img-grid">
  //         {
  //           favItems.map((favItem, index) => {
  //             return  <motion.div  className="img-wrap"
  //              key = { favItem.id }
  //               layout
  //               whileHover={{ opacity: 1 }}
  //               // onClick={() => setSelectedImg(favItem.recipe.url)}
  //               >
  //               <FavoritePage 
  //               doc = { favItem }
  //               setSelectedImg = {setSelectedImg}
  //               deleteEvent = { e => deleteEvent(index, favItem.id)}
  //               editEvent = { e => editEvent(index, favItem.id) }/> 
  //             </motion.div>
              
  //           })
  //         }
  //       </div>
  //     </Fragment>
    
  //   }
  //   </div>
    
  // );
}

export default Favorite;