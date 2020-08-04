import React from "react";


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
    <div>
    { mode === SHOW && <FavoriteItems
      doc = { props.doc }
      deleteEventReq = { deleteEventReq }/>
    }

    { mode === CONFIRM && <Confirm
      onCancel = { back }
      onConfirm = { props.deleteEvent }
     
      /> }

    </div>
  );
}

export default FavoritePage;