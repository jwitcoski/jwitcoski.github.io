L.mapbox.accessToken = 'pk.eyJ1IjoiZW1pbHltZHVib2lzIiwiYSI6ImNpajBmZ2p5azAwODN1YWx6ZjJ2MjFxYmQifQ.FbCG71iC6_bjFcDqolAo0Q';
var map = L.mapbox.map('map', 'mapbox.streets', { zoomControl: false })
  .setView([38.9015,-77.0330], 12);

L.control.zoom({ position: 'topleft' }).addTo(map);

// disable dragging to keep map fixed
map.scrollWheelZoom.disable();
map.keyboard.disable();
if (map.tap) map.tap.disable();

// list of filters
var filters = document.getElementById('filters');
var checkboxes = document.getElementsByClassName('filter');
var layerGroup = L.layerGroup();


map.on('click', function (e) {

  if (layerGroup) { layerGroup.clearLayers(); };

  var latitude = e.latlng.lat.toFixed(2);
  var longitude = e.latlng.lng.toFixed(2);
  console.log('Latitude:', latitude);
  console.log('Longitude:', longitude);

  var on = [];
  for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) on.push(checkboxes[i].value);
  };

  var object = './pointlayer.js';

  var results = [];
  for (var i = 0; i < on.length; i++) {
    results.push(object[longitude + ',' + latitude + ',' + on[i]]);
  };

  var fc = '{"type":"FeatureCollection","features":[' + results.join(',') + ']}';

  var isodistanceLayer = L.mapbox.featureLayer(JSON.parse(fc));
  layerGroup.addLayer(isodistanceLayer).addTo(map);

});
