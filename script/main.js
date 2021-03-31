mapboxgl.accessToken = 'pk.eyJ1IjoiamFkZWQ5OSIsImEiOiJja21rbDhiMmcxMXB2MnZxazFnOWR2cmRtIn0.wJ7MX9l2Aj0xYOi6iYgSBw';
var map = new mapboxgl.Map({
container: 'map',
zoom: 14.77,
center: [4.322840, 52.067101],
pitch: 83,
style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'
});
 
map.on('load', function () {
map.addSource('mapbox-dem', {
'type': 'raster-dem',
'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
'tileSize': 512,
'maxzoom': 14
});
map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
 
map.addLayer({
'id': 'sky',
'type': 'sky',
'paint': {
// set up the sky layer to use a color gradient
'sky-type': 'gradient',
// the sky will be lightest in the center and get darker moving radially outward
// this simulates the look of the sun just below the horizon
'sky-gradient': [
'interpolate',
['linear'],
['sky-radial-progress'],
0.8,
'rgba(135, 206, 235, 1.0)',
1,
'rgba(0,0,0,0.1)'
],
'sky-gradient-center': [0, 0],
'sky-gradient-radius': 90,
'sky-opacity': [
'interpolate',
['exponential', 0.1],
['zoom'],
5,
0,
22,
1
]
}
});
});