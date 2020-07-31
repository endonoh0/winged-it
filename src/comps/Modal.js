import React from 'react';

const Modal = ({ selectedImg, setSelectedImg }) => {
  // close the modal
  const handleClick = (e) => {
    setSelectedImg(null);
  }

  return (
    // the backdrop behind modal (semi transparent sheet that fades behind the modal)
    <div className="backdrop" onClick={handleClick}>
      <img src={selectedImg} alt="enlarged pic" />
    </div>
  )

}

export default Modal;
