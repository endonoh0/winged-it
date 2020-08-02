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

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchTags, setSearchTags] = useState([]);


  return (
    <div className="App">
      {/* <SideBar /> */}
      {/* { <button onClick={event => {
        event.preventDefault()
        projectAuth.signOut()
      }}>Signout</button> */}

      {/* <Title/>
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      { selectedImg && <Modal  setSelectedImg={setSelectedImg} /> } */}
      <SearchByIngredient
        searchTags={searchTags}
        setSearchTags={setSearchTags}
      />
      { searchTags }
    </div>
  );
}

export default App;
