import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ selectedImg, setSelectedImg }) => {
  // close the modal
  const handleClick = (e) => {

    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  }

  return (
    // the backdrop behind modal (semi transparent sheet that fades behind the modal)
    // BUG FIXED: we only want to click on this div and not the image to close
    <motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img src={selectedImg} alt="enlarged pic"
      // offset for y axis
      // takes it above the browser screen
        initial={{ y: "-100vh" }}
      // bring back to original position
        animate={{ y: 0 }}
      />
    </motion.div>
  )

}

export default Modal;
