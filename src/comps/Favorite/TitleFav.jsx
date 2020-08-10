import React from 'react';

import './TitleFav.scss'


const TitleFav = (props) => {

  return (
    <div className="Title_Favorite_page">
      <h1> { props.children } </h1>
    </div>
  );

}

export default TitleFav;