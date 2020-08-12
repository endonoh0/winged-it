import React from "react";

/* Styles */
import "./Confirm.scss";

/* Bootstrap */
import Button from "react-bootstrap/Button";

import { GiCancel } from "react-icons/gi";
import { AiOutlineCheckCircle } from "react-icons/ai";


//this component shows the confirm message when deleting
const Confirm = (props) => {

  return (

    <div className="confirmation_container">

      <h4 className="confirmation_message">
        Delete Recipe?
      </h4>

      <div className="delete-title">
        <Button
          variant="outline-danger"
          onClick={props.onConfirm}
        >
          Delete
        </Button>

        <Button
          variant="outline-warning"
          onClick={event => props.onCancel()}
        >
          Cancel
        </Button>
      </div>

    </div>
  );
}

export default Confirm;
