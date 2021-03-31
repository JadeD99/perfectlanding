mapboxgl.accessToken = 'pk.eyJ1IjoiamFkZWQ5OSIsImEiOiJja21rbDhiMmcxMXB2MnZxazFnOWR2cmRtIn0.wJ7MX9l2Aj0xYOi6iYgSBw';

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
zoom: 12,
center: [-158.000061, 21.438911]
});


//------------Knoppen koppelen aan locaties
document.getElementById('knop1').onclick = function() {
	map.flyTo({
		center: [-156.331924, 20.798363],
		speed: 0.2,
	essential: true // this animation is considered essential with respect to prefers-reduced-motion
	});
};
document.getElementById('knop2').onclick = function() {
map.flyTo({
		center: [14.602859514023589, 40.63356246965732],
		speed: 0.2,
	essential: true // this animation is considered essential with respect to prefers-reduced-motion
	});
};

document.getElementById('knop3').onclick = function() {
map.flyTo({
		center: [0,30],
		zoom: 2,
		speed: 0.5,
	essential: true // this animation is considered essential with respect to prefers-reduced-motion
	});
};

var marker = new mapboxgl.Marker({color: "#B1B9FC"})
.setLngLat([-158.000061, 21.438911])
// .setPopUp(popup)
.addTo(map);

var marker2 = new mapboxgl.Marker({color: "#B1B9FC"})
.setLngLat([-156.331924, 20.798363])
.setPopUp(popup)
.addTo(map);

var marker3 = new mapboxgl.Marker({color: "#B1B9FC"})
.setLngLat([14.602859514023589, 40.63356246965732])
.setPopUp(popup)
.addTo(map);

var marker4 = new mapboxgl.Marker({color: "#B1B9FC"})
.setLngLat([-149.824260, 61.537280])
.setPopUp(popup)
.addTo(map);




 
map.on('load', function () {
// Add Mapillary sequence layer.
// https://www.mapillary.com/developer/tiles-documentation/#sequence-layer
map.addSource('mapillary', {
'type': 'vector',
'tiles': [
'https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt'
],
'minzoom': 6,
'maxzoom': 14
});
map.addLayer(
{
'id': 'mapillary',
'type': 'line',
'source': 'mapillary',
'source-layer': 'mapillary-sequences',
'layout': {
'line-cap': 'round',
'line-join': 'round'
},
'paint': {
'line-opacity': 0.6,
'line-color': '#8390FA',
'line-width': 2
}
},
'waterway-label'
);
});
 console.log(map);
map.addControl(new mapboxgl.NavigationControl());

// markers toevoegen
// var popup = new mapboxgl.Popup({ offset: 25 }).setText(
// 'Veel landingsplezier hier.'
// );


//------------Geocoder--------------
var geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
types: 'country,region,place,postcode,locality,neighborhood'
});



geocoder.addTo('#geocoder');



geocoder.on('result', function(response) {
document.getElementById('longSpan').innerHTML = response.result.center[0];
document.getElementById('latSpan').innerHTML = response.result.center[1];



map.flyTo({
center: [response.result.center[0], response.result.center[1]],
zoom: 12,
speed: 0.5,
essential: true // this animation is considered essential with respect to prefers-reduced-motion
});



var request = 'https://api.openweathermap.org/data/2.5/weather?lat=' + response.result.center[1] + '&lon=' + response.result.center[0] + '&appid=795c18ee99ae89fb4ded6d7194f41cb2'
// get current weather
fetch(request)

// parse response to JSON format
.then(function(responseWeather) {
return responseWeather.json();
})

// do something with response
.then(function(responseWeather) {
// show full JSON object
var weatherBox = document.getElementById('weather');
var degC = Math.floor(responseWeather.main.temp - 273.15);
weatherBox.innerHTML = degC + '&#176;C <br>' + responseWeather.weather[0].description;
});
});



//--------------------Open weather API--------------------