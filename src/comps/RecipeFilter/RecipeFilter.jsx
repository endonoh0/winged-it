import React from 'react';

import Dropdown from './Dropdown.jsx';
import useWriteToFirestore from '../../hooks/useWriteToFirestore';
import { timeStamp } from '../../firebase/config';
import { healthItems, dietItems } from "../../db/foodfilter";

import "./RecipeFilter.scss";



const RecipeFilter = (props) => {

  const {
    searchTagsFetchStatus,
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
      healthTags={healthTags}
      items={healthItems}
      setHealth={setHealth}
      health={health}
      searchTagsFetchStatus={searchTagsFetchStatus}
      multiSelect />
      <Dropdown title="Diet filter" items={dietItems} diet={diet} setDiet={setDiet} />
    </div>
  );
}

export default RecipeFilter;
