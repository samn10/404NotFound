// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

export var App = {
  run: function(){
    var jQuery = require('jquery');
    var GoogleMapsLoader = require('google-maps');
    GoogleMapsLoader.KEY = 'AIzaSyCP1cMFGxLSYdTbP9-r9TdGOn7Ft1E6JCE';

GoogleMapsLoader.load(function(GoogleMaps){

		var myLatlng = new google.maps.LatLng(-41.2443701,174.7618546);
		var mapOptions = {
		zoom: 9,
		center: myLatlng
		}

		new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	}); 

  }
}

