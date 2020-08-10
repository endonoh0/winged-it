import React from 'react';

import Dropdown from './Dropdown.jsx';
import useWriteToFirestore from '../../hooks/useWriteToFirestore';
import { timeStamp } from '../../firebase/config';
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
