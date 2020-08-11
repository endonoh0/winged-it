import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import axios from 'axios'

// SCSS Style files
import './index.scss';
import './comps/Home/NavbarTop/NavbarTop.scss';
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
import Loading from './comps/Favorite/Loading';
import Map from './comps/Map/Map'
import NewRecipe from './comps/NewRecipe'
import Ingredients from './comps/Ingredients/Ingredients'
import Search from "./comps/Search/Search";
import AnimatedGrid from './comps/AnimatedGrid/AnimatedGrid'

import NavbarTop from './comps/Home/NavbarTop/NavbarTop';
import Home from './comps/Home/Home';
import ScrollToTop from './comps/ScrollToTop/ScrollToTop';
import FavoriteAlert from './comps/FavoriteAlert/FavoriteAlert';



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
  const [healthTags, setHealthTags] = useState([]);
  const [dietTags, setDietTags] = useState([]);
  const [searchTagsFetchStatus, setSearchTagsFetchStatus] = useState(false)

  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({ loggedIn: false });
  const [health, setHealth] = useState([]);
  const [diet, setDiet] = useState(null);
  const [title, setTitle] = useState('');
  const [directions, setDirections] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [favoriteAlert, setFavoriteAlert] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const { write } = useWriteToFirestore();


  const onSubmit = async (e) => {
    // const result = await axios.get('./recipe.json')
    // setRecipes(result.data.hits)


    // Real API Call
    setLoadingStatus(true);
    recipeFinder(searchTags, health, diet)
      .then(data => {
        setRecipes(data)
      })
      .then(() => {
        setLoadingStatus(false);
      })
  };




  //Write tags
  const writeTag = (searchTerm, dbField) => {




    if (dbField === "searchTags" && !searchTags.includes(searchTerm) && user.loggedIn) {
      const info = { searchTags: searchTerm? [...searchTags, searchTerm]: [...searchTags], createdBy: user.email, editedAt: timeStamp() };

      write("searchTags", info)

    }

  }



  //Remove tags
  const removeTag = (searchTerm) => {
    const newTags = searchTags.filter(tags => tags !== searchTerm)
    const info = { searchTags: [...newTags], createdBy: user.email, editedAt: timeStamp() }
    setSearchTags([...newTags])
    if (user.loggedIn) {
      write('searchTags', info)
    }
  }
//Read tags
  useEffect(() => {
    if (user.loggedIn) {
      projectFirestore.collection('searchTags')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.data()) {

            setSearchTags([...doc.data().searchTags]);
          }
        })
        .then(() => {

          setSearchTagsFetchStatus(true)
        })
    }
  }, [user]);


  // listen to auth state change
  useCurrentUser(setUser);

  // listen to acition events from auth comps
  const requestLogin = useCallback((event, email, password) => {
    login(event, email, password, setCookie);
  });

  const requestRegister = useCallback((event, email, password) => {
    register(event, email, password, setCookie);
  });

  const requestLogout = useCallback(() => {
    setSearchTags([])
    setRecipes([])
    logout();
    removeCookie('user');
  }, []);




  const filter = <RecipeFilter
  setDietTags={setDietTags}
  dietTags={dietTags}
  healthTags={healthTags}
  setHealthTags={setHealthTags}
  writeTag={writeTag}

  searchTagsFetchStatus={searchTagsFetchStatus}
  user={user}
  setHealth={setHealth}
  health={health}
  diet={diet}
  setDiet={setDiet} />

  const componentProps = {
    searchbar: <SearchByIngredient
    // setRecipes={setRecipes}
    searchTags={searchTags}
    setSearchTags={setSearchTags}
    writeTag={writeTag}
    onSubmit={onSubmit}
    searchTagsFetchStatus={searchTagsFetchStatus}
    filter={filter}
  >
    {/* {recipes && <RecipeGrid recipes={recipes} setSelectedImg={setSelectedImg} user={user} setFavoriteAlert={setFavoriteAlert}/>} */}
  </SearchByIngredient>
  }

  return (
    <div className="App">
      <ScrollToTop />
      {/* {!user.loggedIn && <Header />} */}


      {favoriteAlert && <FavoriteAlert setFavoriteAlert={setFavoriteAlert} /> }
      <Router>
        <NavbarTop user={cookies.user} />
        <Switch>
          <Route path="/search">
          <Search
            user={user}
            setDiet={setDiet}
            setHealth={setHealth}
            searchTags={searchTags}
            setSearchTags={setSearchTags}
            writeTag={writeTag}
            onSubmit={onSubmit}
          />
          </Route>
          <Route path="/signin">
            <div className="auth-wrapper">
              {!cookies.user ? <SignIn onClick={requestLogin} loginWithGoogle={e => (loginWithGoogle(setCookie))} /> : <Redirect to='/' />}
            </div>
          </Route>
          <Route path="/signup">
            <div className="auth-wrapper">
              {!cookies.user && <SignUp onClick={requestRegister} />}
            </div>
          </Route>
          <Route path="/logout">
            <div className="auth-wrapper">
              {cookies.user && <UserProvider value={user}>
                <Logout
                  onClick={requestLogout}
                  UserContext={UserContext}
                />
              </UserProvider>}
            </div>
          </Route>
          <Route path="/favorites"><Favorite setSelectedImg={setSelectedImg} user={user}/></Route>
          <Route path="/map">
            <Map setDirections={setDirections} directions={directions} user={user}/>
          </Route>
          <Route path="/results">
            <AnimatedGrid removeTag={removeTag} recipes={recipes} setRecipes={setRecipes} selectedImg={selectedImg} setSelectedImg={setSelectedImg} searchTags={searchTags} componentProps={componentProps}/>
          </Route>
          <Route path="/newRecipe">
            <NewRecipe>{title}</NewRecipe>
            <SideBar form={true} title={title} setTitle={setTitle}/>
          </Route>
          <Route path="/seasonal-ingredients">
            <Ingredients />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      {loadingStatus && <Loading/>}
    </div>
  );
}

export default App;
