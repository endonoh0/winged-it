import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl'
import getRoute from '../helper/directionApi'
import axios from 'axios'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

const useMap = (mapContainerRef, setDirections) => {

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/streets-v11',
      center: [-123.1207, 49.2510], // Coordinates for vancouver
      zoom: 12.5,
		});

    // variable for directions that will be defined when user clicks on geolocate button
    let start;

		map.on('load', async () => {

			// Local call to json file for the points on the map
			const mapPoints = await axios.get('./mapPoints.json')

			map.loadImage('./Pin.png', (error, image) => {
				if(error){
					throw error
				}
				console.log(mapPoints);
				map.addImage('pin', image)
				// add the data source for new a feature collection with no features
				map.addSource('farmers-markets', {
					type: 'geojson',
					data: mapPoints.data,
				});
				map.addLayer({
					id: 'markets',
					source: 'farmers-markets',
					type: 'symbol',
					layout: {
						'icon-image': 'pin',
						'icon-size': .7,
						'icon-padding': 0,
						'icon-allow-overlap': true,
						'text-field':['get', 'title'],
						'text-offset': [0, 1.25],
						'text-anchor': 'top',
          },
        })
      });
		});

		const geolocate = new mapboxgl.GeolocateControl({ potionOptions: {enableHighAccuracy: true}, trackUserLocation: true });

		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
    map.addControl(geolocate, 'top-left')

		geolocate.on('geolocate', e => {
      start = [e.coords.longitude, e.coords.latitude]
		})

    // Change the cursor to a pointer when the mouse is over the places layer.
		map.on('mouseenter', 'markets', function() {
			map.getCanvas().style.cursor = 'pointer';
		});

		// Change it back to a pointer when it leaves.
		map.on('mouseleave', 'markets', function() {
			map.getCanvas().style.cursor = '';
		});

		map.on('click', 'markets', function(e) {
			const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      if(start) {
        // getRoutes(coordinates)
        getRoute(map, start, coordinates, setDirections)
      }

			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

			new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(description)
			.addTo(map);
		});

		// Cleanup of the useEffect
		return () => map.remove();
	},[])

}

export default useMap;
