import React, { Fragment } from "react";
import { motion } from 'framer-motion';
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import "./FavoriteItems.scss";

// This component shows the  items in favorite table
// The component is passed to index.jsx in the same folder

// ****** View Recipe needs to be implemented *******
const FavoriteItems = (props) => {

  return (
    <Fragment key = {props.doc.id}>
      <motion.img src={props.doc.recipe.img}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // transition={{ delay: 1 }}
        onClick={e => props.setSelectedImg(props.doc.recipe.url)}
      />
      <FiEdit3 className="btn" onClick = { props.editEvent } size={40}/>
      <AiOutlineDelete className="btn" id="delete_icon" onClick = { e => props.deleteEventReq()} size={40}/>
      <div className="desc">{ props.doc.recipe.name }</div>
    </Fragment>
  );
};

export default FavoriteItems;
