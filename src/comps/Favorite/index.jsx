import React, { Fragment } from "react";


import { useVisualMode } from "../../hooks/useVisualMode";

import FavoriteItems from "./FavoriteItems";
import Confirm from "./Confirm";

const SHOW = "SHOW";
const CONFIRM = "CONFIRM";

const FavoritePage = (props) => {
  

  const { mode, transition, back } = useVisualMode(SHOW);

  const deleteEventReq = () => {
    transition(CONFIRM);
  }

  return(
    <Fragment>
    { mode === SHOW && <FavoriteItems
      doc = { props.doc }
      setSelectedImg = {props.setSelectedImg}
      deleteEventReq = { deleteEventReq }
      editEvent = { props.editEvent }
      />
    }

    { mode === CONFIRM && <Confirm
      onCancel = { back }
      onConfirm = { props.deleteEvent }
     
      /> }

    </Fragment>
  );
}

export default FavoritePage;