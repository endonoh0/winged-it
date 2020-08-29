import React from 'react';

import './FavoriteAlert.scss';

import Alert from 'react-bootstrap/Alert';

import { FaHeart } from 'react-icons/fa';
const FavoriteAlert = ({ setFavoriteAlert, alertMessage }) => {

  let alertType = "success";

  if (alertMessage === "Recipe Unfavorited") {
    alertType = "danger";
  }

  setTimeout(() => {
    setFavoriteAlert(false);
  }, 3000);

  return (
    <Alert
      className="myAlert-bottom"
      variant={alertType}
      onClose={() => setFavoriteAlert(false)}
    >
      <FaHeart />
      <Alert.Link
        href="/favorites"
      >
        { alertMessage }
      </Alert.Link>
    </Alert>
  )
}

export default FavoriteAlert;
