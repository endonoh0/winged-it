import React, { useState } from "react";

const Edit = (props) => {

  const [recipeTitle, setRecipeTitle] = useState(props.editPlaceholder);

  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;

    if (name === "recipeTitle") {
      setRecipeTitle(value);
    }
  };



 return (
  <div className="Edit" onSubmit={event => event.preventDefault()}>


    <div className="div-group">
      <label >Recipe Title:</label>
      <input type="text" className="form-control"  
        
        name= "recipeTitle"
        value={ recipeTitle }
        onChange = { (event) => onChangeHandler(event) }
        />
    </div>

    <button type="submit" className="btn btn-primary"
    onClick = {event => {props.onSave(recipeTitle)}}>
      Save
    </button>
    <button type="submit" className="btn btn-primary"
    onClick = { event => props.onCancel () }>
      Cancel
    </button>
  </div>
)
  

}

export default  Edit;


