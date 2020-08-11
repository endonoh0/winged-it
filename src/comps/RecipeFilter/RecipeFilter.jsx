import React from 'react';

import Dropdown from './Dropdown.jsx';

import { healthItems, dietItems } from "../../db/foodfilter";

import "./RecipeFilter.scss";



const RecipeFilter = (props) => {

  const {
    setDietTags,
    dietTags,
    user,
    writeTag,
    searchTagsFetchStatus,
    healthTags,
    setHealthTags,
    health,
    setHealth,
    diet,
    setDiet,
  } = props;



  return (
    <div className="filter_container">
      <Dropdown title="Health filter"
      name="health"
      setDietTags={setDietTags}
      setHealthTags={setHealthTags}
      user={user}
      writeTag={writeTag}
      diet={diet}
      setDiet={setDiet}
      healthTags={healthTags}
      dietTags={dietTags}
      items={healthItems}
      setHealth={setHealth}
      health={health}
      searchTagsFetchStatus={searchTagsFetchStatus}
      multiSelect />

      <Dropdown title="Diet filter"
      name="diet"
      setDietTags={setDietTags}
      setHealthTags={setHealthTags}
      user={user}
      writeTag={writeTag}
      diet={diet}
      setDiet={setDiet}
      healthTags={healthTags}
      dietTags={dietTags}
      items={dietItems}
      setHealth={setHealth}
      health={health}
      searchTagsFetchStatus={searchTagsFetchStatus}
       />
    </div>
  );
}

export default RecipeFilter;
