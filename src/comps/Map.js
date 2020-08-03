import React,{ useState } from 'react'
import MapGL, {GeolocateControl, Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN=process.env.REACT_APP_MAPBOX_API_KEY

const MARKETS = [
	{
		name:"Riley Park",
		latitude:49.2423705,
		longitude:-123.1080317
	},
	{
		name:"Trout Lake Farmer's",
		latitude:49.2586011,
		longitude:-123.064286
	},
	{
		name:"West End Farmers Market",
		latitude:49.2825989,
		longitude:-123.1325313
	},
	{
		name:"Kitsilano Community Centre",
		latitude:49.2617695,
		longitude:-123.1641412
	},
	{
		name:"Mount Pleasant Farmers Market",
		latitude:49.2639637,
		longitude:-123.0966036
	},
	{
		name:"Main Street Station Farmers Market",
		latitude:49.273389,
		longitude:-123.0997232
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
		zoom: 11,
		popUp: true,
	})
	const [popUp, setPopUp] = useState(true);
	
	const _onViewportChange = viewport => setViewPort({...viewport})
	
	const markers = () => {
		return MARKETS.map((market) =>{
			return (
				<div>
					<Marker captureClick={true} latitude={market.latitude} longitude={market.longitude}>
						🍔
					</Marker>
					{popUp && <Popup
						latitude={market.latitude}
						longitude={market.longitude}
						closeButton={true}
						closeOnClick={false}
						onClose={() => setPopUp(false)}
						anchor="bottom" >
					<div>{market.name}</div>
					</Popup>}
				</div>
				
			);
		})
	}
	console.log(markers());
  
  return (
    <div style={{ width: '100vw', height: '100vh'}}>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v8"
        onViewportChange={_onViewportChange}
      >
				
				{markers()}
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