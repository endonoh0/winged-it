import React from 'react';

import "./BottomSection.scss";

const BottomSection = () => {

  return (
    <section id="about">
      <div className="home_div_bottom">
        <div className="home_title">
          <h3>About Winged It</h3>
          <span className="horizontal_line"> </span>
        </div>
        <div className="home_text">
          <p className="home_desription_text">Whether you're looking for healthy recipes, or ideas on how to use leftovers from your fridge, we've numerous recipes to choose from, so you'll be able to find the perfect dish.</p>
        </div>

        <div className="img_container">
          <figure id="vertical_img" className="home_figure ">
            <img className="vertical gallery__img img_left static" src="gallery__img img_right static" src="./bread.png" />
            <img className="vertical gallery__img img_left active" src="gallery__img img_right static" src="./bread.gif"></img>
          </figure>

          <div >
            <figure className="home_figure  img_right_top">
              <img className="gallery__img img_right static" src="./taco.png" />
              <img className="gallery__img img_right active" src="./taco.gif"></img>
            </figure>

            <figure className="home_figure img_right_bottom">
              <img className="gallery__img img_right static" src="./tea.png" />
              <img className="gallery__img img_right active" src="./tea.gif"></img>
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BottomSection;
