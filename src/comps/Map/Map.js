import React, { useRef } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.scss'
import useMap from '../../hooks/useMap'

const Map = ({ setDirections }) => {
  const mapContainerRef = useRef(null);

  useMap(mapContainerRef, setDirections);

	return <div className='map-container' ref={mapContainerRef} />
}

export default Map
