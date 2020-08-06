import React, { useState, useEffect } from 'react';

import './Instructions.scss'

const Instructions = ({data}) => {
  // const [step, setStep] = useState([]);

  let legs = data.legs
  let steps = '';
  let duration;

  if (legs) {
    steps = legs[0].steps
    duration = Math.floor(data.duration / 60) + ' min 🚲';
  }

  // console.log(steps);


  var tripInstructions = [];

  for (var i = 0; i < steps.length; i++) {
    tripInstructions.push(steps[i].maneuver.instruction);
  }
  console.log(tripInstructions);


  return (
    <div className="instructions">
      <span className="duration">Trip duration: {duration}</span>
      <br/>
      {tripInstructions.map(step => {
        return (
          <>
          <br/>
          <li>{step}</li>
          </>
        )
      })}
    </div>
  )
}

export default Instructions;
