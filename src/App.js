import React, { useState } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import RecipeGrid from './comps/RecipeGrid'
import Modal from './comps/Modal';
import Login from './comps/Auth/SignIn'
import SignUp from './comps/Auth/SignUp'
import { projectAuth } from './firebase/config';
import FavoriteAdd from './comps/Favorite/FavoriteAdd'
import SearchBar from './comps/SearchByIngredient'

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="App">
      <SearchBar setRecipes={setRecipes} setSelectedImg={setSelectedImg}/>

      {/* {<Login /> } */}

      {/* { <SignUp/> } */}

      {/* { <button onClick={event => {
        event.preventDefault()
        projectAuth.signOut()
      }}>Signout</button> */}
      <FavoriteAdd/>
      <Title/>
      <UploadForm />
      <RecipeGrid setSelectedImg={setSelectedImg} recipes={recipes}/>
      {/* <ImageGrid setSelectedImg={setSelectedImg} /> */}
      { selectedImg && <Modal  setSelectedImg={setSelectedImg}  selectedImg={selectedImg}/> }
    </div>
  );
}

export default App;
