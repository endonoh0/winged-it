import React, { useState } from 'react';

import Dropdown from './Dropdown.jsx';

import { healthItems, dietItems } from "../../db/foodfilter";

import "./RecipeFilter.scss";

const RecipeFilter = ({selection, setSelection, diet, setDiet}) => {

  return (
    <div className="filter_container">
      <Dropdown className="health-label" title="Health" items={healthItems} setSelection={setSelection} selection={selection} multiSelect />

      <Dropdown title="Diet" items={dietItems} diet={diet} setDiet={setDiet} />
    </div>
  );
}

export default RecipeFilter;
