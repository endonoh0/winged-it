import React from "react";
import { motion } from 'framer-motion';
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import "./FavoriteItems.scss";

// This component shows the  items in favorite table
// The component is passed to index.jsx in the same folder

// ****** View Recipe needs to be implemented *******
const FavoriteItems = (props) => {

  return (

    <div>
      
          <div key = {props.doc.id} className="favorite">
            <div className = "container">
              <motion.img src={props.doc.recipe.img}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // transition={{ delay: 1 }}
              />
              <button className="btn" onClick = { props.editEvent }><FiEdit3 /></button>
              <button className="btn" id="delete_icon" onClick = { e => props.deleteEventReq() }><AiOutlineDelete /></button>
              
            </div>
            <div className="desc">{ props.doc.recipe.name }</div>
            {/*<button> View Recipe </button>
            <button onClick = { e => props.deleteEventReq() }>
              Delete fav
            </button>
            <button onClick = { props.editEvent }>
              Edit
            </button> */}
          </div>
      
    </div>
   
  );
};

export default FavoriteItems;
