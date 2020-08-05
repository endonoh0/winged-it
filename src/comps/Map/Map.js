import React,{ useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import MapGL, {GeolocateControl, Marker, Popup } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.scss'
import results from './mapData'

const TOKEN=process.env.REACT_APP_MAPBOX_API_KEY
mapboxgl.accessToken = TOKEN

const MARKETS = [
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


const Map = () => {
	const mapContainerRef = useRef(null);

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/streets-v11',
      center: [-123.1207, 49.2510],
      zoom: 12.5,
		});

		map.on('load', () => {
			map.loadImage('https://raw.githubusercontent.com/endonoh0/winged-it/feature/map/assets/Pin.png?token=AK2VPAOCG7UT5J2PHPTBNKS7GNJPS', (error, image) => {
				if(error){
					throw error
				}
				map.addImage('pin', image)
				// add the data source for new a feature collection with no features
				map.addSource('farmers-markets', {
					type: 'geojson',
					data: {
						type: 'FeatureCollection',
						features: results,
					},
				});
				map.addLayer({
					id: 'markets',
					source: 'farmers-markets',
					type: 'symbol',
					layout: {
						'icon-image': 'pin',
						'icon-padding': 0,
						'icon-allow-overlap': true,
						'text-field':['get', 'title'],
						'text-offset': [0, 1.25],
						'text-anchor': 'top',
					},
				});
		});

			})
			
		
		map.on('click', 'markets', function(e) {
			const coordinates = e.features[0].geometry.coordinates.slice();
			const description = e.features[0].properties.description;

			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}
			 
			new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(description)
			.addTo(map);
		});

		// Change the cursor to a pointer when the mouse is over the places layer.
		map.on('mouseenter', 'places', function() {
			map.getCanvas().style.cursor = 'pointer';
		});

		// Change it back to a pointer when it leaves.
		map.on('mouseleave', 'places', function() {
			map.getCanvas().style.cursor = '';
		});


		
		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
		map.addControl(new mapboxgl.GeolocateControl({ potionOptions: {enableHighAccuracy: true}, trackUserLocation: true }))

		return () => map.remove();
	}, []);

	return <div className='map-container' ref={mapContainerRef} />

  // const [viewport, setViewPort ] = useState({
  //   width: 900,
  //   height: 900,
  //   latitude: 49.2510,
  //   longitude: -123.1207,
	// 	zoom: 11,
	// 	popUp: true,
	// })
	// const [popUp, setPopUp] = useState(true);
	
	// const _onViewportChange = viewport => setViewPort({...viewport})
	
	// const markers = () => {
	// 	return MARKETS.map((market) =>{
	// 		return (
	// 			<div>
	// 				<Marker captureClick={true} latitude={market.latitude} longitude={market.longitude}>
	// 					🍔
	// 				</Marker>
	// 				{popUp && <Popup
	// 					latitude={market.latitude}
	// 					longitude={market.longitude}
	// 					closeButton={true}
	// 					closeOnClick={false}
	// 					onClose={() => setPopUp(false)}
	// 					anchor="bottom" >
	// 				<div>{market.name}</div>
	// 				</Popup>}
	// 			</div>
				
	// 		);
	// 	})
	// }
	// console.log(markers());
  
  // return (
  //   <div style={{ width: '100vw', height: '100vh'}}>
  //     <MapGL
  //       {...viewport}
  //       mapboxApiAccessToken={TOKEN}
  //       mapStyle="mapbox://styles/mapbox/streets-v8"
  //       onViewportChange={_onViewportChange}
  //     >
				
	// 			{markers()}
  //       <GeolocateControl
  //         style={geolocateStyle}
  //         positionOptions={{enableHighAccuracy: true}}
  //         trackUserLocation={false}
  //       />
  //     </MapGL>
  //   </div>
  // )
}

export default Map