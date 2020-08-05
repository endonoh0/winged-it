import React, { useState } from 'react';

import "../RecipeFilter/RecipeFilter.scss";

function Dropdown (
  {
    title,
    items = [],
    multiSelect = false,
    setSelection,
    selection = [],
    diet,
    setDiet
  }) {

  // toggle dropdown
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  function handleOnClick(e, item) {

    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setDiet(e.target.value)

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
          <p>{open ? 'Close' : 'Open'}</p>
        </div>
      </div>

      {open && (
        <ul className="dd-list">
          {items.map(item => (
            <li className="dd-list-item" key={item.id}>

            <input
                type="checkbox"
                class="custom-control-input"
                id={item.id}
                value={item.value}
                onClick={(e) => handleOnClick(e, item, item.id)}
                defaultChecked={isItemInSelection(item)}
                checked={diet && diet === item.value}
              />

              <label class="custom-control-label" htmlFor={item.id}>{item.value}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown