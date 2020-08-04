import React from "react";


//this component shows the confirm message when deleting
const Confirm = (props) => {

  return (
    <div>
      <h1> Are you sure?</h1>
      <button onClick = { props.onConfirm }>
        Confirm
      </button>
      <button onClick = { (e) => props.onCancel()}>
        Cancel
      </button>
    </div>
    
  ) 
  
}

export default Confirm;