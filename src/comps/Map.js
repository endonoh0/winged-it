import React,{ useState } from 'react'
import MapGL, {GeolocateControl, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN=process.env.REACT_APP_MAPBOX_API_KEY

const MARKETS = [
	{
		name:"Riley Park",
		latitude:"49.2423705",
		longitude:"-123.1080317"
	},
	{
		name:"Trout Lake Farmer's",
		latitude:"49.2586011",
		longitude:"-123.064286"
	},
	{
		name:"West End Farmers Market",
		latitude:"49.2825989",
		longitude:"-123.1325313"
	},
	{
		name:"Kitsilano Community Centre",
		latitude:"49.2617695",
		longitude:"-123.1641412"
	},
	{
		name:"Kitsilano Community Centre",
		latitude:"49.2617695",
		longitude:"-123.1641412"
	}
]

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

const Map = () => {
  const [viewport, setViewPort ] = useState({
    width: 900,
    height: 900,
    latitude: 49.2510,
    longitude: -123.1207,
    zoom: 11
	})
	
	const _onViewportChange = viewport => setViewPort({...viewport})
	
	const markers = () => {

	}
  
  return (
    <div style={{ width: '100vw', height: '100vh'}}>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v8"
        onViewportChange={_onViewportChange}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={false}
        />
      </MapGL>
    </div>
  )
}

export default Map