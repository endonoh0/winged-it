import React from "react";
import { Link } from 'react-router-dom';
import Card from  'react-bootstrap/Card';
import "./Search.scss"

const Suggestions = (props) => {

  const {
    suggestions,
    title,
    imgGridClickHandler
  } = props;


  return (
    <section className="suggestion_container">
      <h1 id="suggestion_title">{title}</h1>
      <article className="grids_container">
        {suggestions.map(suggestion => (

            <Link className="grid" to="/results">
              <Card onClick={e => imgGridClickHandler(suggestion.name, title)} className="grid__card" style={{width: '18rem'}}>
                <Card.Img className="grid__img" variant="top" src={suggestion.url} />
                <Card.Title className="grid__title" >{suggestion.name.toUpperCase()}</Card.Title>
              </Card>
            </Link>
        ))}
      </article>
    </section>
  );
}

export default Suggestions;