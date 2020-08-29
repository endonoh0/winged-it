import React, { Fragment } from "react";

import { useVisualMode } from "../../hooks/useVisualMode";

import FavoriteItems from "./FavoriteItems";
import Confirm from "./Confirm";
import TitleFav from './TitleFav'
import Edit from './Edit'

const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"

const FavoritePage = (props) => {
  const { mode, transition, back } = useVisualMode(SHOW);

  const deleteEventReq = () => {
    transition(CONFIRM);
  }

  function editEvent(index, docId) {
    props.setEditDoc([index, docId]);
    transition(EDIT);
  }

  const deleteEvent = () => {
    props.deleteEvent()
    transition(SHOW);
  }

  const saveEvent = (value) => {
    props.save(value)
    transition(SHOW)
  }

  return(
    <Fragment>
    { mode === SHOW && <FavoriteItems
      doc = { props.doc }
      setSelectedImg = {props.setSelectedImg}
      deleteEventReq = { deleteEventReq }
      editEvent = { e => editEvent(props.index, props.doc.id) }
      />
    }

    { mode === CONFIRM && <Confirm
      onCancel = { back }
      onConfirm = { deleteEvent }

      /> }

      {mode === EDIT &&
            <Fragment>
              <TitleFav>Edit Recipe?</TitleFav>
              <Edit
              onSave={saveEvent}
              onCancel={ back }
              editPlaceholder = { props.doc.recipe.name }
               />
            </Fragment>
          }

    </Fragment>
  );
}

export default FavoritePage;
