import React, { useState } from 'react';

import Dropdown from './Dropdown.jsx';

import { healthItems, dietItems } from "../../db/foodfilter";

import "./RecipeFilter.scss";

const RecipeFilter = (props) => {

  const {
    selection,
    setSelection,
    diet,
    setDiet
  } = props;

  console.log(diet);

  return (
    <div className="filter_container">
      <Dropdown title="Health filter" items={healthItems} setSelection={setSelection} selection={selection} multiSelect />
      <Dropdown title="Diet filter" items={dietItems} diet={diet} setDiet={setDiet} />
    </div>
  );
}

export default RecipeFilter;
