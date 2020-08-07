import React from 'react';

import "./HomeBottomSection.scss";

const HomeBottomSection = () => {

  return (
    <div>
      <div className="home_div_botton">
        <div className="img_container">
      <figure className="home_figure ">
      <img className="gallery__img img_left static" src="gallery__img img_right static" src="./bread.png"/>
      <img className="gallery__img img_left active" src="gallery__img img_right static" src="./bread.gif"></img>
      
      </figure>
      
      <div >
      <figure className="home_figure  img_right_top">
      <img className="gallery__img img_right static" src="./taco.png"/>
      <img className="gallery__img img_right active" src="./taco.gif"></img>
      </figure>
      
      <figure className="home_figure img_right_bottom">
      <img className="gallery__img img_right static" src="./tea.png"/>
      <img className="gallery__img img_right active" src="./tea.gif"></img>  
      </figure>
      </div>
      
      </div>
        <div className="home_desription">
          <h3  className="home_desription_title">Winged It</h3>
          <p className="home_desription_text">Whether you're looking for healthy recipes, or ideas on how to use leftovers from your fridge, we've numerous recipes to choose from, so you'll be able to find the perfect dish.</p>
        </div>
      </div>
      <div id="bottom_bar_home"></div>
    </div>
    );
  }

export default HomeBottomSection;