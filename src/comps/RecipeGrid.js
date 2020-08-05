import React from 'react';
import { motion } from 'framer-motion';

import FavoriteAdd from './Favorite/FavoriteAdd';
import "./Favorite/FavoriteAdd.scss"

const RecipeGrid = ({ recipes, setSelectedImg }) => {

  return (
    <div className="img-grid">
      
      {recipes && recipes.map((recipe, index) => (
        <div className = "container_home" key={index}>
          <FavoriteAdd recipe={ recipe }/>
          <motion.div id="img_wrap" className="img-wrap" 
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => setSelectedImg(recipe.recipe.url)}>
            <motion.img src={recipe.recipe.image} alt="recipe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
          
        </div>
        ))}
    </div>
  )
}

export default RecipeGrid;

// 0:
// bookmarked: false
// bought: false
// recipe:
// calories: 308.34999999999997
// cautions: []
// dietLabels: ["Low-Carb"]
// digest: (26)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
// healthLabels: (5)["Sugar-Conscious", "Vegetarian", "Peanut-Free", "Tree-Nut-Free", "Alcohol-Free"]
// image: "https://www.edamam.com/web-img/20f/20f0c2553240a2c6bc639d64df3f9df4.jpg"
// ingredientLines: (2)["1 teaspoon vinegar", "4 very fresh large eggs"]
// ingredients: Array(2)
// 0: { text: "1 teaspoon vinegar", weight: 5, image: "https://www.edamam.com/food-img/5f6/5f69b84c399d778c4728e9ab4f8065a2.jpg" }
// 1: { text: "4 very fresh large eggs", weight: 215, image: "https://www.edamam.com/food-img/a7e/a7ec7c337cb47c6550b3b118e357f077.jpg" }
// length: 2
// __proto__: Array(0)
// label: "Poached Eggs"
// shareAs: "http://www.edamam.com/recipe/poached-eggs-7a844b79a5df3f11e822cc229bfb3981/eggs"
// source: "Epicurious"
// totalDaily: { ENERC_KCAL: { … }, FAT: { … }, FASAT: { … }, CHOCDF: { … }, FIBTG: { … }, … }
// totalNutrients: { ENERC_KCAL: { … }, FAT: { … }, FASAT: { … }, FATRN: { … }, FAMS: { … }, … }
// totalTime: 0
// totalWeight: 220
// uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_7a844b79a5df3f11e822cc229bfb3981"
// url: "https://www.epicurious.com/recipes/food/views/poached-eggs-236720"
// yield: 4
