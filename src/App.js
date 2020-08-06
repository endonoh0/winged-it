import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import axios from 'axios'

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
import Favorite from '../src/comps/Favorite'
import SideBar from './comps/SideBar/SideBar';
import RecipeFilter from './comps/RecipeFilter/RecipeFilter'
import Map from './comps/Map/Map'


// FireBase Functions
import { projectAuth, onAuthStateChange, projectFirestore, timeStamp } from './firebase/config';
import { useCurrentUser } from './hooks/userAuth';
import { registerVersion } from 'firebase';
import { logout, login, register, loginWithGoogle } from './helper/authApi'
import useWriteToFirestore from './hooks/useWriteToFirestore'
import SearchTag from './comps/SearchByIngredient/SearchTag';
import recipeFinder from './helper/foodApi'

// Default params for the current user
const defaultUser = { loggedIn: false, email: "" };
const UserContext = React.createContext(defaultUser);
// Use a provider to pass current users to the logout component
const UserProvider = UserContext.Provider;


function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchTags, setSearchTags] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({ loggedIn: false });
  const [selection, setSelection] = useState([]);
  const [diet, setDiet] = useState(null);
  const [directions, setDirections] = useState(null);

  const { write } = useWriteToFirestore();

  const onSubmit = async (e) => {

		const result = await axios.get('./recipe.json')
		setRecipes(result.data.hits)

    // Real API Call
    // recipeFinder(searchTags, selection, diet)
    //   .then(data => {
    //     setRecipes(data)
    //   })
  }

  useEffect(() => {
    console.log(user);
    if (user.loggedIn) {
      projectFirestore.collection('searchTags')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.data()) {
            setSearchTags([...doc.data().searchTags]);
          }
        })
    }
  }, [user])

  // listen to auth state change
  useCurrentUser(setUser);

  // listen to acition events from auth comps
  const requestLogin = useCallback((event, email, password) => {
    login(event, email, password);
  });

  const requestRegister = useCallback((event, email, password) => {
    register(event, email, password);
  });

  const requestLogout = useCallback(() => {
    setSearchTags([])
    setRecipes([])
    logout();
  }, []);

  const writeTag = (searchTerm) => {
    // Makes sure the search term is unique
    if (!searchTags.includes(searchTerm) && user.loggedIn) {
      const info = { searchTags: [...searchTags, searchTerm], createdBy: user.email, editedAt: timeStamp() }
      write('searchTags', info)
    }
  }

  const removeTag = (searchTerm) => {
    const newTags = searchTags.filter(tags => tags !== searchTerm)
    const info = { searchTags: [...newTags], createdBy: user.email, editedAt: timeStamp() }
    setSearchTags([...newTags])
    if (user.loggedIn) {
      write('searchTags', info)
    }
  }

  return (
    <div className="App">

      {!user.loggedIn && <Header />}

      <Router>

        {projectAuth.currentUser && <NavBar />}


        <Switch>
          <Route path="/signin">
            <div className="auth-wrapper">
              {!user.loggedIn ? <SignIn onClick={requestLogin} loginWithGoogle={loginWithGoogle} /> : <Redirect to='/' />}
            </div>
          </Route>
          <Route path="/signup">
            <div className="auth-wrapper">
              {!user.loggedIn && <SignUp onClick={requestRegister} />}
            </div>
          </Route>
          <Route path="/logout">
            <div className="auth-wrapper">
              {user.loggedIn && <UserProvider value={user}>
                <Logout
                  onClick={requestLogout}
                  UserContext={UserContext}
                />
              </UserProvider>}
            </div>
          </Route>
          <Route path="/favorites"><Favorite setSelectedImg={setSelectedImg}/></Route>
          <Route path="/map">
            <Map setDirections={setDirections} />
            {directions && <SideBar searchTags={searchTags} user={user} removeTag={removeTag} directions={directions} /> }
            {/* {!directions && <SideBar searchTags={searchTags} user={user} removeTag={removeTag} /> } */}
          </Route>
          <Route path="/">
          <SideBar searchTags={searchTags} user={user} removeTag={removeTag} />

            <SearchByIngredient
              // setRecipes={setRecipes}
              searchTags={searchTags}
              setSearchTags={setSearchTags}
              writeTag={writeTag}
              onSubmit={onSubmit}
            />
            <RecipeFilter setSelection={setSelection} selection={selection} diet={diet} setDiet={setDiet} />
            {recipes && <RecipeGrid recipes={recipes} setSelectedImg={setSelectedImg} />}
          </Route>

        </Switch>

      </Router>

      {/* { <Title/> } */}
      {/* <FavoriteAdd/> */}
      {/* <UploadForm /> */}
      {/* <ImageGrid setSelectedImg={setSelectedImg} /> */}
      {/* { selectedImg && <Modal  setSelectedImg={setSelectedImg} /> } */}


      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}

    </div>
  );
}

export default App;
