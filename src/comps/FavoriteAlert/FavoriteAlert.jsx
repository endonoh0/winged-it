import React from 'react';

import './FavoriteAlert.scss';

import Alert from 'react-bootstrap/Alert';

import { FaHeart } from 'react-icons/fa';
const FavoriteAlert = ({ setFavoriteAlert }) => {

  setTimeout(() => {
    setFavoriteAlert(false);
  }, 2000);

  return (
    <Alert
      className="myAlert-bottom"
      variant="success"
      onClose={() => setFavoriteAlert(false)}
    >
    <FaHeart /> Recipe Added to
      <Alert.Link href="/favorites"> Favorites
      </Alert.Link>
    </Alert>
  )
}

export default FavoriteAlert;
