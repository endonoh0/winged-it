import React, { useEffect } from 'react';
import getDirections from '../../helper/getDirections';
import './Directions.scss';

const Directions = ({data}) => {
  let legs = data.legs
  let summary;
  let steps;
  let duration;
  let distance;
  console.log('log', data);
  useEffect(() => {

  }, [data]);

  if (legs) {
    summary = legs[0].summary;
    steps = legs[0].steps;
    distance = (data.distance / 1000).toFixed(2) + ' km';
    duration = Math.floor(data.duration / 60);
  }

  var tripInstructions = [];

  for (var i = 0; i < steps.length; i++) {
    tripInstructions.push(steps[i].maneuver.instruction);
  }

  return (
    <div className="instructions">
      <div className="duration">
        <h1>{duration} mins <span className="distance">({distance})</span> 🚲</h1>
        <span className="summary"><strong>To: </strong>{summary}</span>
      </div><br/>
      <ol className="flex">
        {tripInstructions.map(step => {
          return (
            <li>{getDirections(step)} {step}</li>

          )
        })}
      </ol>
    </div>
  );
}

export default Directions;
