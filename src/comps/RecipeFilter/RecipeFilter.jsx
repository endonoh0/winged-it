import React from 'react';

import Dropdown from '../Dropdown/Dropdown.jsx';

import { healthItems, dietItems } from "../../db/foodfilter";

import "./RecipeFilter.scss";

const RecipeFilter = ({selection, setSelection, diet, setDiet}) => {

  return (
    <div className="filter_container">
      <Dropdown title="Health filter" items={healthItems} setSelection={setSelection} selection={selection} multiSelect />
      <Dropdown title="Diet filter" items={dietItems} diet={diet} setDiet={setDiet} />
    </div>
  );
}

export default RecipeFilter;
