import React from "react";
import { GiCancel } from "react-icons/gi";
import { AiOutlineCheckCircle } from "react-icons/ai";


import "./Confirm.scss";

//this component shows the confirm message when deleting
const Confirm = (props) => {

  return (
    <div className="confirmation_container">
      <h4> Are you sure you want to delete this recipe?</h4>
      <button className="btn"  onClick = { props.onConfirm }>
        <AiOutlineCheckCircle />
      </button>
      <button className="btn" onClick = { (e) => props.onCancel()}>
        <GiCancel />
      </button>
    </div>
    
  ) 
  
}

export default Confirm;