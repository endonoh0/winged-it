import React, { useState } from 'react';

import "./RecipeFilter.scss";
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';


const Dropdown = (props) => {
  
  const {
    title,
    items = [],
    multiSelect = false,
    setSelection,
    selection = [],
    diet,
    setDiet
  } = props;

  // toggle dropdown
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const [filterSelection, setFilterSelection] = useState([]);



  function handleOnClick(e, item) {

    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        
        setFilterSelection(e.target.value);

 
      } else if (multiSelect) {
     
        setSelection((prev) => [...prev, item]);
        
      }
    } else {
      let selectionAfterRemoval = selection;

      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    if (selection.find(current => current.id === item.id)) {
      return true;
    }
    return false;
  }


  ////
  const applyButton = (e) => {
    if(multiSelect) {
      // setFilterSelection(filterSelection);
    } else {
      setDiet(filterSelection[0]);
    }
    
    
    setOpen(false);
  }

  const clearButton = (e) => {

  }

  console.log(diet);
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
          {console.log(diet)}

            <input
                type="checkbox"
                className="custom-control-input"
                id={item.id}
                value={item.value}
                onClick={(e) => handleOnClick(e, item, item.id)}
                defaultChecked={item.id === 25 || isItemInSelection(item)}
                // checked={diet && diet === item.value} 
                // checked={ filterSelection && filterSelection === item.value }
              />

              <label className="custom-control-label" htmlFor={item.id}>{item.value}</label>
            </li>
          ))}
          <button onClick={e => applyButton(e)}>Apply</button>
          <button>Clear</button>
        </ul>
      )}
    </div>
  )
}

export default Dropdown
