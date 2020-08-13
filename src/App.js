import React, { useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useCookies } from 'react-cookie';

// SCSS Style files
import './index.scss';
import './comps/Home/NavbarTop/NavbarTop.scss';
// import './comps/Auth/Auth.scss';

// REACT COMPONENTS
import SearchByIngredient from './comps/SearchByIngredient/index'
import SignUp from './comps/Auth/SignUp'
import SignIn from './comps/Auth/SignIn'
import Logout from './comps/Auth/Logout'
import Favorite from '../src/comps/Favorite'
import RecipeFilter from './comps/RecipeFilter/RecipeFilter'
import Loading from './comps/Favorite/Loading';
import Map from './comps/Map/Map'
import Ingredients from './comps/Ingredients/Ingredients'
import Search from "./comps/Search/Search";
import AnimatedGrid from './comps/AnimatedGrid/AnimatedGrid'
import NavbarTop from './comps/Home/NavbarTop/NavbarTop';
import Home from './comps/Home/Home';
import ScrollToTop from './comps/ScrollToTop/ScrollToTop';
import FavoriteAlert from './comps/FavoriteAlert/FavoriteAlert';

// FireBase Functions
import { useCurrentUser } from './hooks/userAuth';
import { logout, login, register, loginWithGoogle } from './helper/authApi'
import useApplicationData from './hooks/useApplicationData'

// Default params for the current user
const defaultUser = { loggedIn: false, email: "" };
const UserContext = React.createContext(defaultUser);
const UserProvider = UserContext.Provider;

function App() {
  const {
    state,
    setRecipes,
    setSearchTags,
    setSelectedImg,
    setSelectedRecipe,
    setHealthTags,
    setDietTags,
    setUser,
    setHealth,
    setDiet,
    setTitle,
    setDirections,
    setFavoriteAlert,
    writeTag,
    removeTag,
    onSubmit,
  } = useApplicationData();
  const { searchTags, healthTags, dietTags, searchTagsFetchStatus, user, health, diet, title, directions, favoriteAlert, loadingStatus, selectedRecipe } = state
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

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

  const componentProps = {
    searchbar: <SearchByIngredient
    searchTags={searchTags}
    setSearchTags={setSearchTags}
    writeTag={writeTag}
    // onSubmit={onSubmit}
    searchTagsFetchStatus={searchTagsFetchStatus}
    filter= { <RecipeFilter
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
      setDiet={setDiet}/> }
  />
  }

  return (
    <div className="App">
        <ScrollToTop />
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
            <AnimatedGrid
            removeTag={removeTag}
            recipes={state.recipes} setRecipes={setRecipes}
            selectedImg={state.selectedImg}
            setSelectedImg={setSelectedImg}
            searchTags={searchTags}
            componentProps={componentProps}
            health={health}
            diet={diet}
            onSubmit={onSubmit}
            user={user}
            setFavoriteAlert={setFavoriteAlert}
            setSelectedRecipe={setSelectedRecipe}
            selectedRecipe={selectedRecipe}
            />
          </Route>
          <Route path="/seasonal-ingredients">
            <Ingredients
              searchTags={searchTags}
              setSearchTags={setSearchTags}
              writeTag={writeTag} />
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
