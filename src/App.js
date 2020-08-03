import React, { useState, useEffect, useCallback } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import FavoriteAdd from './comps/Favorite/FavoriteAdd'
import SearchByIngredient from './comps/SearchByIngredient/index'
// import SearchTag from './comps/SearchByIngredient/SearchTag'
import RecipeGrid from './comps/RecipeGrid';

import './index.scss';
// import './comps/Auth/Auth.scss';

import NavBar from './comps/NavBar/NavBar';
import Header from './comps/Header/Header';
import SignUp from './comps/Auth/SignUp'
import SignIn from './comps/Auth/SignIn'
import { projectAuth, onAuthStateChange } from './firebase/config';

import Favorite from '../src/comps/Favorite/Favorite'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function login(username, password) {
  projectAuth.signInWithEmailAndPassword(username, password);
}

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchTags, setSearchTags] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({ loggedIn: false });


  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const requestLogin = useCallback((email, password) => {
    login(email, password);
  });

  return (
    <div className="App">

      <Router>

        <Header />
        {/* {projectAuth.currentUser && <NavBar />} */}

        <div className="auth-wrapper">
          <Switch>
            <Route exact path="/" component={App}></Route>
            {/* <SignUp path="/signup" />
            <SignIn path="/signin" setUser={setUser} /> */}

            <Route path="/signup" component={SignUp}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/search" component={SearchByIngredient}></Route>
            <Route path="/favorites" component={Favorite}></Route>
          </Switch>
        </div>
      </Router>
      {/* {!user.loggedIn && <SignUp onClick={requestLogin} />} */}

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

      {/* { recipes && <RecipeGrid recipes={recipes} setSelectedImg={setSelectedImg} /> } */}
      {/* { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> } */}

    </div>
  );
}

export default App;
