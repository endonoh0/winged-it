import React from 'react';

const Modal = ({ selectedImg }) => {

  return (
    // the backdrop behind modal (semi transparent sheet that fades behind the modal)
    <div className="backdrop">
      <img src={selectedImg} alt="enlarged pic" />
    </div>
  )

}

export default Modal;
