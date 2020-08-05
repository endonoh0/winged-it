import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken=process.env.REACT_APP_MAPBOX_API_KEY

const map = new mapboxgl.Map({
	container: 'root',
	style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
	center: [-74.5, 40], // starting position [lng, lat]
	zoom: 9 // starting zoom
});

export default map;