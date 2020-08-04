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
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_EDIT = "ERROR_EDIT";

const FavoritePage = (props) => {

  // check if there is anything in database 
  // if there is change to show
  // if not change to empty
  // show the confirmation for deleting
  // show deleting message 
  // work on the editing form
  //refresh the page after deleteing


  //FIrst Get the Cancel working

  //This part get data from database
  const deleteFav = (docId) => {
    transition(CONFIRM);
  }

  const deleteFavConfirm = (docId) => {
    projectFirestore.collection('favorites').doc(props.doc.id).delete();
    transition(SHOW);
  }

  

  const { mode, transition, back } = useVisualMode(SHOW);


  return(
    <div>
    { mode === SHOW && <FavoriteItems
      doc = { props.doc }
      deleteEvent = { props.deleteEvent }/>
    }

    { mode === CONFIRM && <Confirm
      onCancel = { back }
      onConfirm = { deleteFavConfirm }
     
      /> }

    </div>
  );
}

export default FavoritePage;




// import React from 'react';

// import Show from "components/Appointment/Show";
// import Empty from "components/Appointment/Empty";
// import Form from "components/Appointment/Form";
// import Status from "components/Appointment/Status";
// import Confirm from "components/Appointment/Confirm";
// import Error from "components/Appointment/Error"
// import { useVisualMode } from "../../hooks/useVisualMode";

// import "components/Appointment/styles.scss";

// const EMPTY = "EMPTY";
// const SHOW = "SHOW";
// const CREATE = "CREATE";
// const SAVING = "SAVING";
// const DELETE = "DELETE";
// const CONFIRM = "CONFIRM";
// const EDIT = "EDIT";
// const ERROR_DELETE = "ERROR_DELETE";
// const ERROR_EDIT = "ERROR_EDIT";


// export default function Appointment (props) {

//   const { mode, transition, back } = useVisualMode(
//     (props.interview) ? SHOW : EMPTY
//   );
  
//   //this function handle saving new appointment
//   const save = (name, interviewer) => {
    
//     const interview = {
//       student: name,
//       interviewer
//     };
    
//     if (interviewer && name) {
//       transition(SAVING);
//       props.bookInterview(props.id, interview)
//       .then(() => {transition(SHOW);})
//       .catch(() => {transition(ERROR_EDIT);});
//     }
    
//   };

//   //this function delete the appointment
//   const deleteAppointment = (event) => {
//     transition(DELETE);
//     props.cancelInterview(props.id)
//     .then(() => {transition(EMPTY);})
//     .catch(() => {transition(ERROR_DELETE);});
//   }

//   //this function shows the confirm message 
//   const showConfirmMessage = (event) => {
//     event.preventDefault()
//     transition(CONFIRM);
//   }

//   //transition to edit
//   const transitionToEdit = (event) => {
//     event.preventDefault();
//     transition(EDIT);
//   };


//   //transition to create
//   const transitionToCreate = (event) => {
//     event.preventDefault();
//     transition(CREATE);
//   };

//   //this function close the error message
//   const closeErrorMessage = (event) => {
//     event.preventDefault();
//     if (props.interview) {
//       transition(SHOW);
//     } else {
//       transition(EMPTY);
//     }
//   }

  
//   return (
//     <article data-testid="appointment">
//       {mode === ERROR_EDIT && <Error onClose={ closeErrorMessage } message={"Could not edit/create appointment."}/>}
//       {mode === ERROR_DELETE && <Error onClose={ closeErrorMessage } message={"Could not delete appointment."}/>}
//       {mode === DELETE && <Status message={ "Deleting" }/>}
//       {mode === CONFIRM && <Confirm onCancel={ back } onConfirm={ deleteAppointment }/>}
//       {mode === SAVING && <Status message={ "Saving" }/>}
//       {mode === EDIT && (
//         <Form
//         interviewers={ props.interviewers }
//         onSave={ save }
//         onCancel={ back }
//         name = { props.interview.student }
//         interviewer = { props.interview.interviewer.id }
//         />
//       )}
//       {mode === CREATE && (
//         <Form
//         interviewers={ props.interviewers }
//         onSave={ save }
//         onCancel={ back }
//         />
//         )}
//       {mode === EMPTY && <Empty onAdd={ transitionToCreate } />}
//       {mode === SHOW && (
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//           onDelete = { showConfirmMessage }
//           onEdit = { transitionToEdit }
//         />
//       )}
//     </article>
//     );
// }

