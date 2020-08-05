import React from 'react';

import Dropdown from '../Dropdown/Dropdown.jsx';

import { healthItems, dietItems, nutrientItems } from "../../db/foodfilter";

import "./RecipeFilter.scss";

const RecipeFilter = () => {

  return (
    <div className="filter_container">
      <Dropdown title="Health filter" items={healthItems} multiSelect />
      <Dropdown title="Diet filter" items={dietItems} multiSelect />
      <Dropdown title="Nutrients" items={nutrientItems} multiSelect />
    </div>


  )
}

export default RecipeFilter;

// {/* Default unchecked */ }
{/* <div class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input" id="defaultUnchecked" />
  <label class="custom-control-label" for="defaultUnchecked">Default unchecked</label>
</div> */}

// {/* Default checked */ }
// <div class="custom-control custom-checkbox">
//   <input type="checkbox" class="custom-control-input" id="defaultChecked" checked />
//   <label class="custom-control-label" for="defaultChecked">Default checked</label>
// </div>

// {/* Default indeterminate */ }
// <div class="custom-control custom-checkbox">
//   <input type="checkbox" class="custom-control-input" id="defaultIndeterminate" checked />
//   <label class="custom-control-label" for="defaultIndeterminate">Default indeterminate</label>
// </div>

// {/* Default unchecked disabled */ }
// <div class="custom-control custom-checkbox">
//   <input type="checkbox" class="custom-control-input" id="defaultUncheckedDisabled" disabled />
//   <label class="custom-control-label" for="defaultUncheckedDisabled">Default unchecked disabled</label>
// </div>

// {/* Default checked disabled */ }
// <div class="custom-control custom-checkbox">
//   <input type="checkbox" class="custom-control-input" id="defaultCheckedDisabled" checked disabled />
//   <label class="custom-control-label" for="defaultCheckedDisabled">Default checked disabled</label>
// </div>


{/* <div className="dropdown" id="valueItemDrop">
  <button className="selectbox" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true"
    aria-expanded="true">
    Select
      </button>
  <ul className="dropdown-menu" aria-labelledby="dLabel">
    <li className="checkbox form-group">
      <input type="checkbox" id="valuePot" value="Value Pot" name="Value Pot" />
      <label htmlFor="valuePot">Value Pot</label>
    </li>
    <li className="checkbox form-group">
      <input type="checkbox" id="payback" value="Payback" name="Payback" />
      <label htmlFor="payback">Payback</label>
    </li>
    <li className="checkbox form-group">
      <input type="checkbox" id="writeOff" value="Write-off" name="Write-off" />
      <label htmlFor="writeOff">Write-off</label>
    </li>
    <li className="checkbox form-group">
      <input type="checkbox" id="offset" value="Offset" name="Offset" />
      <label htmlFor="offset">Offset</label>
    </li>
    <li className="checkbox form-group">
      <input type="checkbox" id="genValuePot" value="Gen Value Pot" name="Gen Value Pot" />
      <label htmlFor="genValuePot">Gen Value Pot</label>
    </li>
    <li className="checkbox form-group">
      <input type="checkbox" id="mancValuePot" value="Manc Value Pot" name="Manc Value Pot" />
      <label htmlFor="mancValuePot">Manc Value Pot</label>
    </li>
  </ul>
</div> */}
