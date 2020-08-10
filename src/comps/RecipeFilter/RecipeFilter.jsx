import React from 'react';

import Dropdown from './Dropdown.jsx';
import useWriteToFirestore from '../../hooks/useWriteToFirestore';
import { timeStamp } from '../../firebase/config';
import { healthItems, dietItems } from "../../db/foodfilter";

import "./RecipeFilter.scss";



const RecipeFilter = (props) => {

  const {
    writeTag,
    searchTagsFetchStatus,
    dietTags,
    healthTags,
    setHealthTags,
    health,
    setHealth,
    diet,
    setDiet,
    user
  } = props;

  

  return (
    <div className="filter_container">
      <Dropdown title="Health filter"
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
