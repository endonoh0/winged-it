import React, { useState } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import FavoriteAdd from './comps/Favorite/FavoriteAdd'
import SearchByIngredient from './comps/SearchByIngredient/index'
// import SearchTag from './comps/SearchByIngredient/SearchTag'
import RecipeGrid from './comps/RecipeGrid';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchTags, setSearchTags] = useState([]);
  const [recipes, setRecipes] = useState([]);


  return (
    <div className="App">

      {/* { <Title/> } */}

      {/* <SearchByIngredient
        searchTags={searchTags}
        setSearchTags={setSearchTags}
        setRecipes={setRecipes}
        recipes={recipes}
      /> */}

      {/* <FavoriteAdd/> */}
      {/* <UploadForm /> */}
      {/* <ImageGrid setSelectedImg={setSelectedImg} /> */}
      {/* { selectedImg && <Modal  setSelectedImg={setSelectedImg} /> } */}

      { recipes && <RecipeGrid recipes={recipes} setSelectedImg={setSelectedImg} /> }
      { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> }

    </div>
  );
}

export default App;
