import React from 'react';

const Modal = ({ selectedImg, setSelectedImg }) => {
  // close the modal
  const handleClick = (e) => {
    setSelectedImg(null);
  }

  return (
    // the backdrop behind modal (semi transparent sheet that fades behind the modal)
    // BUG: we only want to click on this div and not the image to close
    <div className="backdrop" onClick={handleClick}>
      <img src={selectedImg} alt="enlarged pic" />
    </div>
  )

}

export default Modal;
