import React, { useState } from "react";

import Button from 'react-bootstrap/Button';

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
      <label>Title:</label>
      <input type="text" className="form-control"

        name= "recipeTitle"
        value={ recipeTitle }
        onChange = { (event) => onChangeHandler(event) }
        />
    </div>

    <div className="edit-title">
       <Button
        variant="outline-success"
        type="submit"
        onClick={event => { props.onSave(recipeTitle) }}
      >
        Save
      </Button>

      <Button
        variant="outline-warning"
        type="submit"
        onClick={event => props.onCancel()}
      >
        Cancel
      </Button>
    </div>
  </div>
)


}

export default  Edit;
