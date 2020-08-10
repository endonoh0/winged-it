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
    writeTag,
    searchTagsFetchStatus,
    title,
    items = [],
    multiSelect = false,
    setHealth,
    health = [],
    diet,
    setDiet,
    healthTags = [],
    dietTags = [],
  } = props;


  // toggle dropdown
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  //temporary state to get values from checkboxes
  const [filterSelection, setFilterSelection] = useState([]);
  //use this to clear checkbox
  const [checkboxClear, setCheckboxClear] = useState(true);

  // //read the tags from database and put it in the state when the page load
  useEffect(() => {
    if(searchTagsFetchStatus && multiSelect) {
      // inject health tags from firbase to states
      const foo = databaseTagExtract(healthTags, items);
      setHealth(foo);
      setFilterSelection(foo);

    }

    if(searchTagsFetchStatus) {
      setFilterSelection(dietTags)
      setDiet(dietTags[0]);
    }

  }, [searchTagsFetchStatus]);

  console.log(filterSelection);
  function handleOnClick(e, item) {

    setCheckboxClear(true);

    if (!health.some(current => current.id === item.id)) {
      if (!multiSelect) {
        
        setFilterSelection([e.target.value]);
        
      } else if (multiSelect) {

        const filteredArr = [...health,...filterSelection,item].reduce((acc, current) => {
          const x = acc.find(item => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        
        setFilterSelection(filteredArr);
        
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
      
      setHealth(filterSelection);
      writeTag(null, "filterTags");

    } else {

      setDiet(pre => filterSelection[0]);
      writeTag(null, "filterTags");
      
      
      
    }
    
    setOpen(false);
  }




  const clearButton = (e) => {

    setCheckboxClear(false);
    setFilterSelection([]);
    
    if(multiSelect) {
      
      setHealth([]);
      writeTag(null, "filterTags");
    } else {
      setDiet("");
      writeTag(null, "filterTags");
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
