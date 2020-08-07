import React from 'react';

import "./Home.scss";

const Home = () => {

  return (
    <div className="home_div">
      <div className="img_container">
        <div className="top_bar">
          <h3> Logo</h3>
          <div className="home_top_bar_left">
            <div>
            <a id="search_recipe" className="home_top_bar_left_link" href="/">Search Recipe</a>
            </div>
            <div>
            <a className="home_top_bar_left_link" href="/map">Map</a>
            </div>
            <div>
            <a className="home_top_bar_left_link" href="/signup">Sign up</a>
            </div>
            <div>
            <a className="home_top_bar_left_link" href="/signin">Sign in</a>
            </div>
          </div>
        </div>

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
            <a className="home_button"  href='/map'>
            Farmer Markets
            </a>
          </div>
        </div>
        <figure className="home_figure ">
          <img className="gallery__img " src="gallery__img img_right static" src="./pasta_high.gif"/>
        </figure>
      </div>
    </div>
  );
}

export default Home;