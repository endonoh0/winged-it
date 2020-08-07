import React from 'react';

import "./Home.scss";

const Home = () => {

  return (
    <div className="home_div_botton">


      <div className="img_container">

        <figure className="home_figure ">
          
        <img className="gallery__img img_left static" src="gallery__img img_right static" src="https://lh4.googleusercontent.com/-gZiu96oTuu4/Uag5oWLQHfI/AAAAAAAABSE/pl1W8n91hH0/w140-h165-no/Homer-Static.png"/>
        <img className="gallery__img img_left active" src="gallery__img img_right static" src="https://lh4.googleusercontent.com/-gZiu96oTuu4/Uag5oWLQHfI/AAAAAAAABSE/pl1W8n91hH0/w140-h165-no/Homer-Static.png"></img>

        </figure>

        <div >
          <figure className="home_figure  img_right_top">
          <img className="gallery__img img_right static" src="./taco.png"/>
        <img className="gallery__img img_right active" src="./taco.gif"></img>
        </figure>

        <figure className="home_figure img_right_bottom">
        <img className="gallery__img img_right static" src="./pizza.png"/>
        <img className="gallery__img img_right active" src="./pizza.gif"></img>  
        </figure>
        </div>
        
      </div>
      <div className="home_desription">
        <h3  className="home_desription_title">Winged It</h3>
        <p className="home_desription_text">Whether you're looking for healthy recipes, or ideas on how to use leftovers from your fridge, we've numerous recipes to choose from, so you'll be able to find the perfect dish.</p>
      </div>
      
    </div>
  );
}

export default Home;