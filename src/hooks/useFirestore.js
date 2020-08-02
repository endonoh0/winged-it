import { useState, useEffect } from 'react';
import { projectFirestore, projectAuth } from '../firebase/config';


const useFirestore = (type) => {

  
  const [error, setError] = useState(null);
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);

  // const email = projectAuth.currentUser.Identifier;
  const email = "ghanbari@ualberta.ca";

  // useEffect(() => {

  //   const collectionRef = projectFirestore.collection(type); // created automatically
  //   // const email = projectAuth.currentUser.Identifier;
  //   const email = "ghanbari@ualberta.ca";

  //   collectionRef.add({
  //     user_email: email, recipe: {
  //       name: "Pizza",
  //       img: "https://www.simplyrecipes.com/wp-content/uploads/2019/09/easy-pepperoni-pizza-lead-4.jpg"} });
  // }, [])

  useEffect(() => {
    const collectionRef = projectFirestore.collection(type);
    const favorite = collectionRef.where('user_email', '==', email);
    setFavoriteRecipe(favorite);
  }, [])
  

  return { favoriteRecipe }

}

export default useFirestore;
