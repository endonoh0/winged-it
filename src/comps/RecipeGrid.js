import React from 'react';
import { motion } from 'framer-motion';

import FavoriteAdd from './Favorite/FavoriteAdd';
import "./Favorite/FavoriteAdd.scss"

const RecipeGrid = ({ recipes, setSelectedImg }) => {

  return (
    <div className="img-grid">

      {recipes && recipes.map((recipe, index) => (
        <motion.div className="img-wrap" key={index}
          layout
          whileHover={{ opacity: 1 }}
        >
          
          <motion.img src={recipe.recipe.image} alt="recipe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // transition={{ delay: 1 }}
            onClick={() => setSelectedImg(recipe.recipe.url)}
          />
          <FavoriteAdd recipe={ recipe }/>
        </motion.div>
        ))}
    </div>
  )
}

export default RecipeGrid;

// return (
//   <div className="img-grid">

//     {recipes && recipes.map((recipe, index) => (
//       <motion.div className="img-wrap" key={index}
//         layout
//         whileHover={{ opacity: 1 }}
//         onClick={() => setSelectedImg(recipe.recipe.url)}
//       >
//         <p>hi</p>
//         <motion.img src={recipe.recipe.image} alt="recipe"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//         />
//       </motion.div>
//       ))}
//   </div>
// )
// }