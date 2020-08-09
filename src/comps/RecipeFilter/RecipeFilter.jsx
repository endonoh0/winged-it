import React, { useState } from 'react';

import Dropdown from './Dropdown.jsx';

import { healthItems, dietItems } from "../../db/foodfilter";

import "./RecipeFilter.scss";

const RecipeFilter = (props) => {

  const {
    health,
    setHealth,
    diet,
    setDiet
  } = props;

  console.log(diet);

  return (
    <div className="filter_container">
      <Dropdown title="Health filter" items={healthItems} setHealth={setHealth} health={health} multiSelect />
      <Dropdown title="Diet filter" items={dietItems} diet={diet} setDiet={setDiet} />
    </div>
  );
}

export default RecipeFilter;
