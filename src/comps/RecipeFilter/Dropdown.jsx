import React, { useState, useEffect } from 'react';

import "./RecipeFilter.scss";
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import useWriteToFirestore from '../../hooks/useWriteToFirestore'
import { timeStamp, projectFirestore } from '../../firebase/config';

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

const duplicateRemover = (arr) => {

  const filteredArr = arr.reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return filteredArr;

}


const Dropdown = (props) => {
  
  const {
    setDietTags,
    setHealthTags,
    user,
    writeTag,
    title,
    items = [],
    multiSelect = false,
    setHealth,
    health = [],
    setDiet,
  } = props;



  // toggle dropdown
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  //temporary state to get values from checkboxes
  const [filterSelection, setFilterSelection] = useState([]);
  //use this to clear checkbox
  const [checkboxClear, setCheckboxClear] = useState(true);

  const { write } = useWriteToFirestore();

    //Read tags
  useEffect(() => {
    if (user.loggedIn && !multiSelect) {
      projectFirestore.collection('dietTags')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.data()) {
            return doc.data().dietTags;
          }
        })
        .then((data) => {
          setDietTags([data]);
          setDiet(data);
          setFilterSelection([data]);
        }) 
    }
  }, [user]);

  //Read tags
  useEffect(() => {
   if (user.loggedIn && multiSelect) {
     projectFirestore.collection('healthTags')
       .doc(user.uid)
       .get()
       .then(doc => {
         if (doc.data()) {
           return doc.data().healthTags;
         }
       })
       .then((data) => {
         setHealthTags(data);
         const foo = databaseTagExtract(data, items);
         setHealth(foo);
         setFilterSelection(foo)
       }) 
   }
  }, [user]);

    // //Write tags
  const writeFilterTag = (filterSelection, category) => {

    if(user.loggedIn && category === "dietTags") {
      const info = { dietTags: filterSelection,  createdBy: user.email, editedAt: timeStamp() };
      write("dietTags", info)
      return;
    }
  
    const arr = [];
    if (filterSelection){
      for (const item of filterSelection) {
        if (item.value) arr.push(item.value);
      }
    }

    if(user.loggedIn && category === "healthTags") {
      const info = { healthTags: arr,  createdBy: user.email, editedAt: timeStamp() };
      write("healthTags", info)
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
      writeFilterTag(filterSelection, "healthTags")
      

    } else {

      setDiet(pre => filterSelection[0]);
      writeFilterTag(filterSelection[0], "dietTags")
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
      writeFilterTag([], "healthTags")
    } else {
      setDiet("");
      writeTag(null, "filterTags");
      writeFilterTag("", "dietTags")
    }
  }


  function handleOnClick(e, item) {

    setCheckboxClear(true);

    if (!health.some(current => current.id === item.id)) {
      if (!multiSelect) {
        
        setFilterSelection([e.target.value]);
        
      } else if (multiSelect) {
        
        const healthNullCheck = health ? health : null;
        const filterSelectionNullCheck = filterSelection ? filterSelection : [];
        const filteredArr = duplicateRemover([...healthNullCheck, ...filterSelectionNullCheck, item]);
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
