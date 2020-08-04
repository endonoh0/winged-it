import React from "react";

const Edit = () => {

 return (
  <form className="Edit">
    <h2>Edit Your Recipe</h2>

    <div className="form-group">
      <label htmlFor="recipe_title">Recipe Title:</label>
      <input type="text" className="form-control" placeholder="Recipe Title" name="recipe_title"
        />
    </div>

    <button type="submit" className="btn btn-primary btn-block">
      Save
    </button>
    <button type="submit" className="btn btn-primary btn-block">
      Cancel
    </button>
  </form>
)
  

}

export default  Edit;


