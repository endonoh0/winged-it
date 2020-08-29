import {useReducer, useEffect} from 'react';
import { projectFirestore, timeStamp} from '../firebase/config';
import useWriteToFirestore from '../hooks/useWriteToFirestore'
import recipeFinder from '../helper/foodApi'

// reducer accepts an aciton type and returns the current state paired with dispatch

// Action types
const SET_SELECTED_IMG  = "SET_SELECTED_IMG"
const SET_SELECTED_RECIPE  = "SET_SELECTED_RECIPE"
const SET_SEARCH_TAGS = "SET_SEARCH_TAGS"
const SET_HEALTH_TAGS = "SET_HEALTH_TAGS"
const SET_DIET_TAGS = "SET_DIET_TAGS"
const SET_SEARCH_TAGS_FETCH_STATUS = "SET_SEARCH_TAGS_FETCH_STATUS"
const SET_RECIPES = "SET_RECIPES"
const SET_USER = "SET_USER"
const SET_HEALTH = "SET_HEALTH"
const SET_DIET = "SET_DIET"
const SET_TITLE = "SET_TITLE"
const SET_DIRECTION = "SET_DIRECTION"
const SET_FAVORITE_ALERT = "SET_FAVORITE_ALERT"
const SET_LOADING_STATUS = "SET_LOADING_STATUS"

// Reducer switch statements
const reducer = (state, action) => {
  switch (action.type) {
    case SET_SELECTED_IMG:
      return { ...state, selectedImg: action.value }
    case SET_SELECTED_RECIPE:
      return { ...state, selectedRecipe: action.value }
    case SET_SEARCH_TAGS:
      return { ...state, searchTags: action.value }
    case SET_HEALTH_TAGS:
      return { ...state, healthTags: action.value }
    case SET_DIET_TAGS:
      return { ...state, dietTags: action.value }
    case SET_SEARCH_TAGS_FETCH_STATUS:
      return { ...state, searchTagsFetchStatus: action.value }
    case SET_RECIPES:
      return { ...state, recipes: action.value }
    case SET_USER:
      return { ...state, user: action.value }
    case SET_HEALTH:
      return { ...state, health: action.value }
    case SET_DIET:
      return { ...state, diet: action.value }
    case SET_TITLE:
      return { ...state, title: action.value }
    case SET_DIRECTION:
      return { ...state, directions: action.value }
    case SET_FAVORITE_ALERT:
      return { ...state, favoriteAlert: action.value }
    case SET_LOADING_STATUS:
      return { ...state, loadingStatus: action.value }
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
}

const useApplicationData = () => {
	const [state, dispatch] = useReducer(reducer, {
    // initial state
    selectedImg: null,
    searchTags: [],
    healthTags: [],
    dietTags: [],
    searchTagsFetchStatus: false,
    recipes: [],
    user: {loggedIn: false},
    health: [],
    diet: null,
    title: '',
    directions: null,
    favoriteAlert: false,
    loadingStatus: false,
  })

  const { write } = useWriteToFirestore();

  // Set methods for each state
	const setRecipes = (recipes) => dispatch({ type: SET_RECIPES, value: recipes })
	const setSearchTags = (searchTags) => dispatch({type:SET_SEARCH_TAGS, value: searchTags})
  const setSelectedImg = (selectedImg) => dispatch({type:SET_SELECTED_IMG, value: selectedImg})
  const setSelectedRecipe = (selectedRecipe) => dispatch({type:SET_SELECTED_RECIPE, value: selectedRecipe})
	const setHealthTags = (healthTags) => dispatch({type:SET_HEALTH_TAGS, value: healthTags})
	const setDietTags = (dietTags) => dispatch({type:SET_DIET_TAGS, value: dietTags})
	const setSearchTagsFetchStatus = (searchTagsFetchStatus) => dispatch({type:SET_SEARCH_TAGS_FETCH_STATUS, value: searchTagsFetchStatus})
	const setUser = (user) => dispatch({type:SET_USER, value: user})
	const setHealth = (health) => dispatch({type:SET_HEALTH, value: health})
	const setDiet = (diet) => {console.log(diet)
    dispatch({type:SET_DIET, value: diet})}
	const setTitle = (title) => dispatch({type:SET_TITLE, value: title})
	const setDirections = (directions) => dispatch({type:SET_DIRECTION, value: directions})
	const setFavoriteAlert = (favoriteAlert) => dispatch({type:SET_FAVORITE_ALERT, value: favoriteAlert})
  const setLoadingStatus = (loadingStatus) => dispatch({type:SET_LOADING_STATUS, value: loadingStatus})

  const writeTag = (searchTerm, dbField) => {
    if (dbField === "searchTags" && !state.searchTags.includes(searchTerm) && state.user.loggedIn) {
      const info = { searchTags: searchTerm? [...state.searchTags, searchTerm]: [...state.searchTags], createdBy: state.user.email, editedAt: timeStamp() };
      write("searchTags", info)
    }
  }

  const removeTag = (searchTerm) => {
    const newTags = state.searchTags.filter(tags => tags !== searchTerm)
    const info = { searchTags: [...newTags], createdBy: state.user.email, editedAt: timeStamp() }
    setSearchTags([...newTags])
    if (state.user.loggedIn) {
      write('searchTags', info)
    }
  }

  const onSubmit = async (e) => {
    setLoadingStatus(true);
    recipeFinder(state.searchTags, state.health, state.diet)
      .then(data => {
        setRecipes(data)
      })
      .then(() => {
        setLoadingStatus(false);
      })
      .catch((error) =>{
        console.log(error);
      })
  };

  // Reads and sets searchTags
  useEffect(() => {
    if (state.user.loggedIn) {
      projectFirestore.collection('searchTags')
        .doc(state.user.uid)
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
  }, [state.user]);


  return {
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
    onSubmit
  }

}

export default useApplicationData;
