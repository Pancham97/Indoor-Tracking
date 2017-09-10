var map, infoWindow;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 22.5, lng: 74.2},
            zoom: 15,
			mapTypeControl: true,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			zoomControl: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			scaleControl: true,
			streetViewControl: false,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.RIGHT_BOTTOM
			},
			fullscreenControl: true,
			fullscreenControlOptions: {
				position: google.maps.ControlPosition.RIGHT_BOTTOM
			}
        });

		// Create the search box and link it to the UI element.
        var input = document.getElementById('search-input');
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location,
			  draggable: true
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });

        //This is a pop-up if location is found.
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
			console.log("Location services are supported!");
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

				document.getElementById("latitude").innerHTML = pos.lat;
				document.getElementById("longitude").innerHTML = pos.lng;

				//This shows a pop-up when the location is found. Enable if required.
                //infoWindow.setPosition(pos);
                //infoWindow.setContent('Location found.');
                //infoWindow.open(map);
                map.setCenter(pos);

                var marker = new google.maps.Marker({
					draggable: true,
                    position: pos,
                    map: map
                });

                // This code block is just for demo of 'click' event. Uncomment only if you are sure of what you are trying to do.
                // google.maps.event.addListener(marker, 'click', function(event) {
                //     map.setCenter(marker.getPosition());
                //     placeMarkerAndPanTo(event.latLng, map);
                //
                //     //Get new coordinates after dragging the marker on the map.
				// 	console.log(event.latLng.lat());
				// 	console.log(event.latLng.lng());
                //
				// 	//Change the values in the HTML.
				// 	document.getElementById("latitude").innerHTML = event.latLng.lat();
				// 	document.getElementById("longitude").innerHTML = event.latLng.lng();
                // });

				google.maps.event.addListener(marker, 'dragend', function(event) {
                    map.setCenter(marker.getPosition());

					//Get new coordinates after dragging the marker on the map.
					console.log(event.latLng.lat());
					console.log(event.latLng.lng());

					//Change the values in the HTML.
					document.getElementById("latitude").innerHTML = event.latLng.lat();
					document.getElementById("longitude").innerHTML = event.latLng.lng();
					// infoWindow.open(map, marker);
				});
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
			console.log("Browser does not support location services!");
        }
    }

    //new google.maps.event.addDomListener(window, "load", initMap());


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
