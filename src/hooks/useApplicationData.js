import {useReducer} from 'react';

// Action types
const SET_SELECTED_IMG  = "SET_SELECTED_IMG"
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
      return { ...state, direction: action.value }
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
	
	const setRecipes = (recipes) => dispatch({ type: SET_RECIPES, value: recipes })

	const setSearchTags = (searchTags) => dispatch({type:SET_SEARCH_TAGS, value: searchTags})

	const setSelectedImg = (selectedImg) => dispatch({type:SET_SELECTED_IMG, value: selectedImg})

	return {state, setRecipes, setSearchTags, setSelectedImg}

}

export default useApplicationData;