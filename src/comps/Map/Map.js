import React,{ useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import MapGL, {GeolocateControl, Marker, Popup } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.scss'
import results from './mapData'
import Instructions from '../Instructions/Instructions'

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
  const [data, setData] = useState({});

	const mapContainerRef = useRef(null);

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/streets-v11',
      center: [-123.1207, 49.2510],
      zoom: 12.5,
    });
    // set the bounds of the map
    // var bounds = [[-123.069003, 45.395273], [-122.303707, 45.612333]];
    // map.setMaxBounds(bounds);

    // var start = [-122.662323, 45.523751];
    // var end = [-122.677738, 45.522458];
    // var start = [49.2639637, -123.0966036];
    var start = [-123.0966036, 49.2639637];
    var end = [-123.0997232, 49.273389];

    // create a function to make a directions request
    function getRoute(end) {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      // var start = [-122.662323, 45.523751];
      var url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

      // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = function () {
        var json = JSON.parse(req.response);
        var data = json.routes[0];
        setData(data);
        var route = data.geometry.coordinates;
        var geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        };
        // if the route already exists on the map, reset it using setData
        if (map.getSource('route')) {
          map.getSource('route').setData(geojson);
        } else { // otherwise, make a new request
          map.addLayer({
            id: 'route',
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
        }
        // add turn instructions here at the end
      };
      req.send();
    }


		map.on('load', () => {
      getRoute(end);

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
						'icon-size': .7,
						'icon-padding': 0,
						'icon-allow-overlap': true,
						'text-field':['get', 'title'],
						'text-offset': [0, 1.25],
						'text-anchor': 'top',
          },
        })

        // Add starting point to the map
        map.addLayer({
          id: 'point',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: start
                }
              }
              ]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#3887be'
          }
        });

      });
    });
    map.on('click', function(e) {
      var coordsObj = e.lngLat;
      var coords = Object.keys(coordsObj).map(function(key) {
        return coordsObj[key];
      });
      var end = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: coords
          }
        }
        ]
      };
      if (map.getLayer('end')) {
        map.getSource('end').setData(end);
      } else {
        map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: coords
                }
              }]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        });
      }
      getRoute(coords);
    });


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

	return (
    <>
      <div className='map-container' ref={mapContainerRef}></div>
      {data && <Instructions data={data}/> }
    </>
  )

}

export default Map
