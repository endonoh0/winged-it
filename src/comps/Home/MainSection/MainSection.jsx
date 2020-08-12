import React from 'react';
import { Link } from 'react-router-dom';

/* Style */
import "./MainSection.scss";

const MainSection = () => {

  return (
    <div className="home_div">
      <div className="img_container">
        <div className="centered">
          <div className="title_home_page">
            <span className="horizontal_line"> </span>
            <div className="title_text_home_page"> Winged It</div>
            <span className="horizontal_line"></span>
          </div>
          <div className="text_description">Eat Fresh - Eat Healthy </div>
          <div className="home_buttons">
            <Link to="/search">
            <p className="home_button home_button_left">Search Recipe</p>
            </Link>
            <Link to="/map">
              <p className="home_button">Farmer Markets</p>
            </Link>
          </div>
        </div>
        <figure className="home_figure ">
          <img className="gallery__img img_right static" src="./pasta_high.gif" alt="pizza food background"/>
        </figure>
      </div>
    </div>
  );
}

export default MainSection;
