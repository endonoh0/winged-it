import React, { useEffect, useState } from "react";


import { useVisualMode } from "../../hooks/useVisualMode";
import { useFirestoreFavorites } from '../../hooks/useFirestoreFavorites'
import { projectFirestore } from '../../firebase/config';

import FavoriteItems from "./FavoriteItems";
import Loading from "./Loading";
import Confirm from "./Confirm";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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