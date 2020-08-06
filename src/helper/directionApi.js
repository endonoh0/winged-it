import axios from 'axios'

const getRoute = async (map, start, end, setDirections) =>{

	const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`;

	//Axios call to api to get directions
	const res = await axios.get(url)
  const route = res.data.routes[0].geometry.coordinates
  const data = res.data.routes[0];

  setDirections(data);
	const geojson = {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'LineString',
			coordinates: route
		}
	};
	// if the route already exists on the map, reset it using setData
	if (map.getSource('routes')) {
		map.getSource('routes').setData(geojson);
	} else { // otherwise, make a new request
		map.addLayer({
			id: 'routes',
			type: 'line',
			source: {
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'LineString',
						coordinates: geojson
					}
				}
			},
			layout: {
				'line-join': 'round',
				'line-cap': 'round'
			},
			paint: {
				'line-color': '#3887be',
				'line-width': 5,
				'line-opacity': 0.75
			}
		});
		map.getSource('routes').setData(geojson);
	}
}

export default getRoute
