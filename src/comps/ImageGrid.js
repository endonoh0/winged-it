import React from 'react';
import useFirestore from '../hooks/useFirestore';

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore('images'); // listen to images collection
  console.log(docs);

  return (
    <div className="img-grid">
      { docs && docs.map(doc => (
        // we need some click event to update the src value, pass to root app, and finally pass to modal comp
        <div className="img-wrap" key={doc.id}
          onClick={() => setSelectedImg(doc.url)}
        >
          <img src={doc.url} alt="recipe" />
        </div>
      ))}
    </div>
  )
}

export default ImageGrid;
