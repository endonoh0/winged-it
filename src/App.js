import React, { useState } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import Login from './comps/Auth/SignIn';
import SignUp from './comps/Auth/SignUp';
import { projectAuth } from './firebase/config';
// import SideBar from './comps/SideBar/SideBar';
import SearchByIngredient from './comps/SearchByIngredient/index'
// import SearchTag from './comps/SearchByIngredient/SearchTag'
import RecipeGrid from './comps/RecipeGrid';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchTags, setSearchTags] = useState([]);
  const [recipes, setRecipes] = useState([]);

  console.log('recipes', recipes);


  return (
    <div className="App">
      {/* <SideBar /> */}
      {/* { <button onClick={event => {
        event.preventDefault()
        projectAuth.signOut()
      }}>Signout</button> */}

      { <Title/> }
      {/* <UploadForm /> */}

      <SearchByIngredient
        searchTags={searchTags}
        setSearchTags={setSearchTags}
        setRecipes={setRecipes}
        recipes={recipes}
      />
      {/* { searchTags } */}

      {/* <ImageGrid setSelectedImg={setSelectedImg} /> */}
      { recipes && <RecipeGrid recipes={recipes} setSelectedImg={setSelectedImg} /> }
      { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> }

    </div>
  );
}

export default App;
