import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore('images'); // listen to images collection

  return (
    <div className="img-grid">
      { docs && docs.map(doc => (
        // we need some click event to update the src value, pass to root app, and finally pass to modal comp
        <motion.div className="img-wrap" key={doc.id}
        // motion attribute
          layout // when element moves position on page, animate to new positon
          whileHover={{ opacity: 1 }} // animates when hover over element
          onClick={() => setSelectedImg(doc.url)}
        >
          <motion.img src={doc.url} alt="recipe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>

      ))}
    </div>
  )
}

export default ImageGrid;
