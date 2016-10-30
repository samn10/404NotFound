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
    run: function(id) {
        var jQuery = require('jquery');
        jQuery(document).ready(function() {

            var lat, long;
            var location = "http://192.168.226.62/404notfound-server/GetProfile?Unique_ID=" + id;
            var heat_map_info = [];
            jQuery.get(location, function(data, status) {

                    console.log(data.images.length);
           
                for(var i=0; i<data.images.length; i++) {
                    if(i==0) {
                        jQuery("#image").attr('src', data.images[0]);
                    } else if(i<4) {
                        jQuery("#images").append("<img id='image" + i + "' height='160' onerror='this.src=\'/images/profile/noImage.gif\'' width='160' src='" + data.images[i] + "'>" );
                    } 
                    else if(i>=4) {
                        jQuery("#moreImages").attr('href', "#");
                        jQuery("#moreImages").show();
                    }

                }

                jQuery("#Status").text(data.Status);
                jQuery("#Category").text("Category: " + data.Category);
                jQuery("#Output_Area").text(data.Output_Area);
                jQuery("#Accomodation_Type").text("Accomodation type: " + data.Accomodation_Type);
                jQuery("#Gender").text(data.Gender);
                jQuery("#Birth_Year").text(2016-data.Birth_Year);
                jQuery("#Status_Prior_To_Dormant").text(data.Status_Prior_To_Dormant);
                jQuery("#Output_Area_CenX_EPSG27700").text(data.Output_Area_CenX_EPSG27700);
                jQuery("#Output_Area_CenY_EPSG27700").text(data.Output_Area_CenX_EPSG27700);
                jQuery("#Date_Status_Changed_To_Unconfi").text(data.Date_Status_Changed_To_Unconfi);
                jQuery("#Days_Missing").text(Math.round(Math.abs((new Date().getTime() - new Date(data.Date_Went_Missing).getTime()) / (24 * 60 * 60 * 1000))));
                jQuery("#Date_Went_Missing").text("Date went missing: " + data.Date_Went_Missing);
                jQuery("#Date_Record_Updated").text("Updated on " + data.Date_Record_Updated);
                jQuery("#Date_Record_Created").text("Record created on " + data.Date_Record_Created);
                jQuery("#Borough").text(data.Borough);
                jQuery("#Status").text(data.Status);
                jQuery.each(data.heat_map_info, function(index) {
                    heat_map_info.push(data.heat_map_info[index]);
                });
                if (data.notes.length > 0){
                	jQuery.each(data.notes, function(index) {
                    	jQuery('#notesEmpty').prepend('<div class="note">' + data.notes[index]+ '</div>');
                	});
            	} else {
            		jQuery("#nonotes").show();
            	}
                

                var gender = "";
                if (data.Gender == "M") {
                    gender = "&#x2642;";
                }
                if (data.Gender == "F") {
                    gender = "&#x2640;";
                }
                jQuery("#Name").text(data.Forenames + " " + data.Surname);
                jQuery('#Name').after(gender);
                jQuery("Date_Last_Seen").text(data.Date_Last_Seen);
                if (data.Status == "Returned") {
                    jQuery('#stillMissing').hide();
                    jQuery('#found').show();
                }


                lat = data.lat;
                long = data.long;

                var GoogleMapsLoader = require('google-maps');
                GoogleMapsLoader.KEY = 'AIzaSyCP1cMFGxLSYdTbP9-r9TdGOn7Ft1E6JCE';
                GoogleMapsLoader.LIBRARIES = ['visualization'];
                GoogleMapsLoader.load(function(GoogleMaps) {

                    var myLatlng = new google.maps.LatLng(lat, long);
                    var mapOptions = {
                        zoom: 15,
                        center: myLatlng
                    }

                    var heatmapData = [];
                    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
                    
                    jQuery.each(heat_map_info, function(index) {
                    	if (!(isNaN(heat_map_info[index].lat) && isNaN(heat_map_info[index].long))) {
                     	   heatmapData.push(new google.maps.LatLng(heat_map_info[index].lat, heat_map_info[index].long));
                    	}
                    });

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(lat, long),
                        map: map
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: 'Gone missing in here'
                    });

                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });

                    google.maps.event.addListener(map, "click", function(event) {
                        infowindow.close();
                    });

                    var fakeMarker;
                    google.maps.event.addListener(map, "click", function(event) {
                    	var startLocation = event.latLng;
                    	if (fakeMarker) {
                    		fakeMarker.setMap(null);
                    	}
                    	var image = {
				          url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
				          // This marker is 20 pixels wide by 32 pixels high.
				          size: new google.maps.Size(20, 32),
				          // The origin for this image is (0, 0).
				          origin: new google.maps.Point(0, 0),
				          // The anchor for this image is the base of the flagpole at (0, 32).
				          anchor: new google.maps.Point(0, 32)
				        };
				        fakeMarker = new google.maps.Marker({
				        	position: startLocation,
				        	icon: image,
				        	map: map
				        });
				        var markerLat = event.latLng.lat();
        				var markerLng = event.latLng.lng();

                    	var infowindow = new google.maps.InfoWindow({
                        	content: 'oh '
                    	});
                    	infowindow.setContent('<a href="http://192.168.226.62/404notfound-server/AddLocation?Unique_ID='+data.Unique_ID+'&lat='+markerLat+'&long='+markerLng+'">Report sighting</a>');

                        infowindow.open(map, fakeMarker);
					});

                    var heatmap = new google.maps.visualization.HeatmapLayer({
                        data: heatmapData
                    });
                    heatmap.setMap(map);
                });
            });
        });




    },
    profiles: function() {
        var jQuery = require('jquery');
        jQuery(document).ready(function() {
            var jQuery = require('jquery');

            var lat, long;




            lat = "53.546941137914956";
            long = "2.631838902300045";

            var GoogleMapsLoader = require('google-maps');
            GoogleMapsLoader.KEY = 'AIzaSyCP1cMFGxLSYdTbP9-r9TdGOn7Ft1E6JCE';
            GoogleMapsLoader.LIBRARIES = ['visualization'];
            GoogleMapsLoader.load(function(GoogleMaps) {

                var myLatlng = new google.maps.LatLng(lat, long);
                var mapOptions = {
                    zoom: 9,
                    center: myLatlng
                }

                var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
                var markers = [];
                var heat_map_info = [];
                var images = [];
                var imagesId = [];
                var prev_infowindow;
                var bounds = new google.maps.LatLngBounds();
                var location = "http://192.168.226.62/404notfound-server/GetNearby?lat=53.546941137914956&long=-2.631838902300045";
                jQuery.get(location, function(data, status) {
                    jQuery.each(data, function(index) {
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(data[index].lat, data[index].long),
                            map: map,
                            title: data[index].Unique_ID
                        });
                        markers.push(marker);

                        jQuery.each(data[index].heat_map_info, function(i) {
                            heat_map_info.push(data[index].heat_map_info[i]);
                        });
                        var infowindow = new google.maps.InfoWindow({
                            content: '<a target=_blank" href="/profile/' + data[index].Unique_ID + '">' + data[index].Forenames + ' ' + data[index].Surname + '</a><br><img style="display:block;margin-left:auto;margin-right:auto;" width="80" src="' + data[index].images[0] + '">'
                        });
                        marker.addListener('click', function() {
                            if (prev_infowindow) {
                                prev_infowindow.close();
                            }
                            prev_infowindow = infowindow;
                            infowindow.open(map, marker);
                        });

                        google.maps.event.addListener(map, "click", function(event) {
                            infowindow.close();
                        });

                        bounds.extend(marker.getPosition());
                        map.fitBounds(bounds);

                        images.push(data[index].images[0]);
                        imagesId.push(data[index].Unique_ID);

               		 });

	                var heatmapData = [];
	                for (var i=0; i<heat_map_info.length; i++){
	                	var latAux = heat_map_info[i].lat;
	                	var longAux = heat_map_info[i].long;
	                	heatmapData.push(new google.maps.LatLng(latAux,longAux));
	                }

	                var heatmap = new google.maps.visualization.HeatmapLayer({
	                    data: heatmapData,
	                    map: map
	                });
	                heatmap.setMap(map);
	                var counter = 0;
	                for (var i=0; i<images.length; i++){
	                	if (counter<6){
	                		if (images[i] != "http://2016rotarypresidentialconferencemanila.org/wp-content/uploads/2015/05/user-icon-silhouette.png"){
	                			jQuery('#images_carousel').append('<a target="_blank" href="/profile/'+imagesId[i]+'"><img style="display:inline-block;padding:7px;height:230px;" src="'+images[i]+'"></a>');
	                			counter++;
	                		}
	                	}
	            	}


                });

            });
        });

    }
}
