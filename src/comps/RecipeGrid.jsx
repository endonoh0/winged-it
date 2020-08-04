import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';

const RecipeGrid = ({ setSelectedImg, recipes }) => {
  const { docs } = useFirestore('images'); // listen to images collection
  console.log(recipes);

  return (
    <div className="img-grid">
      { recipes && recipes.map(recipe => (
        // we need some click event to update the src value, pass to root app, and finally pass to modal comp
        <motion.div className="img-wrap" key={recipe.id}
        // motion attribute
          layout // when element moves position on page, animate to new positon
          whileHover={{ opacity: 1 }} // animates when hover over element
          onClick={() => setSelectedImg(recipe.url)}
        >
          <motion.img src={recipe.image} alt="recipe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
        
      ))}
    </div>
  )
}

export default RecipeGrid;