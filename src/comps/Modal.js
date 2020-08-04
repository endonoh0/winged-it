import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Iframe from 'react-iframe';
import ScrollLock from 'react-scrolllock';

const Modal = ({selectedImg, setSelectedImg }) => {


  const handleClick = (e) => {

    if (e.target.classList.contains('background')) {
      setSelectedImg(null);
    }
  }

  return (

    <motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
    <ScrollLock>
        <motion.div className="background"
          initial={{ y: "-100vh" }}
          animate={{ y: -60 }}
        >
        <Iframe className="iframe"
          url={selectedImg}
          id="iframe"
        />
        </motion.div>
      </ScrollLock>

    </motion.div>
  )

}

export default Modal;
