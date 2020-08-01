import React, { useState } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import Login from './comps/Auth/SignIn'
import SignUp from './comps/Auth/SignUp'
import { projectAuth } from './firebase/config';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App">

      {/* {<Login /> } */}

      {/* { <SignUp/> } */}

      {/* { <button onClick={event => {
        event.preventDefault()
        projectAuth.signOut()
      }}>Signout</button> } */}

      <Title/>
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      { selectedImg && <Modal  setSelectedImg={setSelectedImg} /> }
    </div>
  );
}

export default App;
