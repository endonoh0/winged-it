import React, { useState, useEffect } from 'react';

import "./RecipeFilter.scss";
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';

const databaseTagExtract = (tags, items) => {
  const databaseTags = [];

  if (tags.length === 0) {
    return;
  }

  for(const tag of tags) {
    for (const item of items) {
      
      
      if (item.value === tag){
        databaseTags.push(item);
        break;
      }

    }
  }

  return databaseTags;

}



const Dropdown = (props) => {
  
  const {
    searchTagsFetchStatus,
    title,
    items = [],
    multiSelect = false,
    setHealth,
    health = [],
    diet,
    setDiet,
    healthTags = []
  } = props;


  // toggle dropdown
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  //temporary state to get values from checkboxes
  const [filterSelection, setFilterSelection] = useState([]);
  //use this to clear checkbox
  const [checkboxClear, setCheckboxClear] = useState(true);



  // console.log("Dropdown -> databaseTagExtract(healthTags,items)", databaseTagExtract(healthTags,items))
  // //read the tags from database and put it in the state when the page load
  useEffect(() => {
    
    if(searchTagsFetchStatus) {
      const foo = databaseTagExtract(healthTags,items);
      setHealth(foo);
      setFilterSelection(foo);
    }
    
    
  }, [searchTagsFetchStatus])

  function handleOnClick(e, item) {

    setCheckboxClear(true);

    if (!health.some(current => current.id === item.id)) {
      if (!multiSelect) {
        
        setFilterSelection([e.target.value]);

      } else if (multiSelect) {
     
        setFilterSelection(prev => [...prev, item]);
        
      }
    } else {

      //this section handle the unchecking
      let selectionAfterRemoval = health;

      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setFilterSelection([...selectionAfterRemoval]);

    }
  }


  function isItemInSelection(item) {
    if (health.find(current => current.id === item.id)) {
      return true;
    }
    return false;
  }

  
  const applyButton = (e) => {
    if(multiSelect) {
      
      console.log("applyButton -> filterSelection", health)
      setHealth(filterSelection);

    } else {
      setDiet(filterSelection[0]);
    }
    
    setOpen(false);
  }

  const clearButton = (e) => {

    setCheckboxClear(false);
    setFilterSelection([]);
    
    if(multiSelect) {
      
      setHealth([]);
    } else {
      setDiet("");
    }
  }


  return (
    <div className="dd-wrapper">

      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div>

        <div className="dd-header__action">
          <p>{open ? <IoIosArrowUp/> : <IoIosArrowDown/>}</p>
        </div>
      </div>

      {open && (
        <ul className="dd-list">
          {items.map(item => (
            <li className="dd-list-item" key={item.id}>
            <input
                type="checkbox"
                className="custom-control-input"
                id={item.id}
                value={item.value}
                onClick={(e) => handleOnClick(e, item, item.id)}
                defaultChecked={item.id === 25 || isItemInSelection(item)}
                // checked={diet && diet === item.value} 
                checked={
                  checkboxClear && 
                  (!multiSelect? filterSelection[0]
                  && filterSelection[0] === item.value : null)
                }
              />

              <label className="custom-control-label" htmlFor={item.id}>{item.value}</label>
            </li>
          ))}
          <button onClick={e => applyButton(e)}>Apply</button>
          <button onClick={e => clearButton(e)}>Clear</button>
        </ul>
      )}
    </div>
  )
}

export default Dropdown
