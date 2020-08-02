import React from "react";
import "./Favorite.scss"
import useFirestore from '../../hooks/useFirestore';
// import { projectAuth } from '../firebase/config';



const Favorite = (prop) => {

  const favorite = useFirestore('favorites');
  console.log(favorite)


  const favoriteItems = [
    {id: 1,
      name: "Pizza",
    img: "https://www.simplyrecipes.com/wp-content/uploads/2019/09/easy-pepperoni-pizza-lead-4.jpg"},
    {id: 2,
      name: "Pizza",
    img: "https://www.simplyrecipes.com/wp-content/uploads/2019/09/easy-pepperoni-pizza-lead-4.jpg"}
  ]

  return (

    <div>
    { favoriteItems.map(item => {
      return (
        <div key={ item.id } className="favorite">
          <a>
            <img src={ item.img } alt="Cinque Terre" width="600" height="400"/>
          </a>
          <div className="desc">{ item.name }</div>
          <button>
            View Recipe 
          </button>
        </div>)
      })
    }
      
    </div>
   
  );
};
export default Favorite;
