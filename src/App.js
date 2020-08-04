import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

// SCSS Style files
import './index.scss';
// import './comps/Auth/Auth.scss';

// REACT COMPONENTS
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import RecipeGrid from './comps/RecipeGrid'
import Modal from './comps/Modal';
import FavoriteAdd from './comps/Favorite/FavoriteAdd'
import SearchByIngredient from './comps/SearchByIngredient/index'
import NavBar from './comps/NavBar/NavBar';
import Header from './comps/Header/Header';
import SignUp from './comps/Auth/SignUp'
import SignIn from './comps/Auth/SignIn'
import Logout from './comps/Auth/Logout'
import Favorite from '../src/comps/Favorite/Favorite'
import SideBar from './comps/SideBar/SideBar';


// FireBase Functions
import { projectAuth, onAuthStateChange, projectFirestore, timeStamp } from './firebase/config';
import { useCurrentUser } from './hooks/userAuth';
import { registerVersion } from 'firebase';
import useWriteToFirestore from './hooks/useWriteToFirestore';

import {logout, login, register}  from './helper/authApi'

const defaultUser = { loggedIn: false, email: "" };
const UserContext = React.createContext(defaultUser);
const UserProvider = UserContext.Provider;


function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchTags, setSearchTags] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({ loggedIn: false });

  // listen to auth state change
  useCurrentUser(setUser);

  // listen to acition events from login and logout componenet
  const requestLogin = useCallback((event, email, password) => {
    login(event, email, password);
  });

  const requestRegister = useCallback((event, email, password) => {
    register(event, email, password);
  });

  const requestLogout = useCallback(() => {
    logout();
  }, []);

  // Writes tags to database whenever searchTags is set
  useWriteToFirestore('searchTags', searchTags, { searchTags: searchTags, createdBy:user.email, editedAt: timeStamp() })

  return (
    <div className="App">

      { !user.loggedIn && <Header /> }
      <SearchByIngredient 
      setRecipes={setRecipes} 
      searchTags={searchTags}
      setSearchTags={setSearchTags}
      />

      <Router>

        {projectAuth.currentUser && <NavBar /> }
        <SideBar setRecipes={setRecipes} searchTags={searchTags} user={user}/>

        <div className="auth-wrapper">
          <Switch>
            <Route path="/signin">{ !user.loggedIn && <SignIn onClick={requestLogin} /> }</Route>
            <Route path="/signup">{ !user.loggedIn && <SignUp onClick={requestRegister} /> }</Route>
            <Route path="/logout">
              { user.loggedIn && <UserProvider value={user}>
                  <Logout
                    onClick={requestLogout}
                    UserContext={UserContext}
                  />
                </UserProvider> }
            </Route>

            <Route path="/favorites"><Favorite /></Route>

          </Switch>
        </div>
      </Router>

      {/* { <Title/> } */}
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
