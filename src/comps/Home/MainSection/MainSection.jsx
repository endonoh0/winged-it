import React from 'react';

import "./MainSection.scss";

const MainSection = () => {

  return (
    <div>
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
              <a className="home_button home_button_left" href='/'>
                Search Recipe
              </a>
              <a className="home_button" href='/map'>
                Farmer Markets
              </a>
            </div>
          </div>

          <figure className="home_figure ">
            <img className="gallery__img img_right static" src="./pasta_high.gif" />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default MainSection;
