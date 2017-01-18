
// $(document).ready(function(){

  function initMap(){
      //Miami
      var defaultLocation = {lat: 25.8042, lng: -80.1989};
      //SF
      // var defaultLocation = {lat: 37.773972, lng: -122.431297};
      
      var randomCities = [{lat: 41.9028, lng: 12.4964},{lat: 25.761681, lng: -80.191788}, {lat: 35.6895, lng: 139.6917}, {lat: 41.3851, lng: 2.1734}, {lat: 45.4384, lng: 10.9916}, {lat: 38.712815, lng: -9.2417338}, {lat: 40.730885,lng: -73.997383}] 
      var currentLocation = {};
        
      var infoWindow;
      var listBox = $('.club-info');
      var clubNames = [];
      var markers = [];
      var iconBase = 'https://day-ana.github.io/clubfinder/images/';
      var icons = {
        club: {
          icon: iconBase + 'club_icon.png'
        },
        you_are_here: {
          icon: iconBase + 'here.png'
        },
        info: {
          icon: iconBase + 'info-i_maps.png'
        }
      };

    //   google.maps.event.addDomListener(window, "load", function () {
    //       map = new google.maps.Map(document.getElementById("map1"), {
    //           center: new google.maps.LatLng(0, 0),
    //           zoom: 14,
    // });

      var map = new google.maps.Map(document.getElementById('map'), {
                center: defaultLocation,
                zoom: 13,
                 styles: [
                  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                  {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{visibility: 'off'}]
                  },
                  {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{visibility: 'off'}]
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{visibility: 'off'}]
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{visibility: 'off'}]
                  },
                  {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#38414e'}]
                  },
                  {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#212a37'}]
                  },
                  {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#9ca5b3'}]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#746855'}]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{visibility: 'off'}]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{visibility: 'off'}]
                  },
                  {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{visibility: 'off'}]
                  },
                  {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{visibility: 'off'}]
                  },
                  {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{color: '#17263c'}]
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{visibility: 'off'}]
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{color: '#17263c'}]
                  }
                ]
              });
        
        function showLoader(){
            $('#overlay').show();
        }
        function removeLoader(){
            $('#overlay').fadeOut(1000);
        }

       function getCurrentLocation(){

            clearMarkers();

            var infoWindow = new google.maps.InfoWindow({map: map});

              // Try HTML5 geolocation.
              if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {
                  var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };

                  console.log(pos)
                  // icon: icons['parking'].icon,
                  infoWindow.setPosition(pos);
                  infoWindow.setContent('You are Here.');
                  map.setCenter(pos);
                  
                  //Set object do your current location
                  currentLocation = pos;
                  // console.log(map.currentLocation)
                  getLocationName(currentLocation);
                  removeLoader()
                }, function() {
                  handleLocationError(true, infoWindow, map.getCenter());
                });
              } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
              }
              
        }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                                  'Error: The Geolocation service failed.' :
                                  'Error: Your browser doesn\'t support geolocation.');
        }

        //https://gist.github.com/AmirHossein/92a0597b5f723b19c648
        function getLocationName(loc){
          var latlng;
            latlng = new google.maps.LatLng(loc.lat, loc.lng); // New York, US
            new google.maps.Geocoder().geocode({'latLng' : latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        var country = null, countryCode = null, city = null, cityAlt = null;
                        var c, lc, component;
                        for (var r = 0, rl = results.length; r < rl; r += 1) {
                            var result = results[r];

                            if (!city && result.types[0] === 'locality') {
                                for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                                    component = result.address_components[c];

                                    if (component.types[0] === 'locality') {
                                        city = component.long_name;
                                        break;
                                    }
                                }
                            }
                            else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
                                for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                                    component = result.address_components[c];

                                    if (component.types[0] === 'administrative_area_level_1') {
                                        cityAlt = component.long_name;
                                        break;
                                    }
                                }
                            } else if (!country && result.types[0] === 'country') {
                                country = result.address_components[0].long_name;
                                countryCode = result.address_components[0].short_name;
                            }

                            if (city && country) {
                                break;
                            }
                        }
                        console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
                         var cityLbl = city;
                         console.log(cityLbl);
                         if(cityLbl == null){
                          cityLbl = "this city";
                         }
                         $('.text-muted').html("Night Clubs in <span>"+city+"</span>" );
                        // return city;
                    }
                }
            });
        }


      function getLocalClubs(random){
            //clear Markers before getting new ones
            clearMarkers();

           infowindow = new google.maps.InfoWindow();
              var service = new google.maps.places.PlacesService(map);
              if(random){
                console.log(random)
                currentLocation = random;
                console.log(currentLocation)
              }

              //If the location is empty set the default to current
              if($.isEmptyObject(currentLocation)){
                 currentLocation = defaultLocation;
              }
              // console.log(currentLocation);

              service.nearbySearch({
                location: currentLocation,
                radius: 8000,
                type: ['night_club']
              }, callback);

              function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                    clubNames.push(results[i].name);
                    // console.log(results[i]);

                  }
                }
              }
              getLocationName(currentLocation);
              removeLoader();
              setMapOnAll(map);
              google.maps.event.trigger(map,'resize');
              

        }

      function createMarker(place) {
                // var placeLoc = place.geometry.location;
                      
                var marker = new google.maps.Marker({
                  icon: icons['club'].icon,
                  map: map,
                  animation: google.maps.Animation.DROP,
                  markerId: place.id,
                  markerOpen: place.opening_hours,
                  position: place.geometry.location
                });

                //Pushing markers into array for reference
                markers.push(marker);

                //Dynamically create the List
                var li = $('<div class="lead">');
                listBox.append(li);
                var rating = place.rating;
                if(rating === undefined){
                  rating = 'n/a';
                }
                var indicator = place['opening_hours'];

                for (var key in indicator){
                    if(indicator[key] === true){
                      indicator= $('<span class="open" alt="Open Now!">')

                    }
                    
                }
                
                if (place.name === undefined){
                    place.name == "n/a";
                    }
                if(place.rating === undefined){
                    place.rating == "n/a";
                    }
                if(place.vicinity === undefined){
                    place.vicinity == "n/a";
                }
                if(place.price_level === undefined){
                  place.price_level == "n/a";
                }

                // var clubName = '<span class="c-name">'+place.name+'</span>'+domLight+'<span id="more">+</span>';
                var clubName = $('<span class="c-name">'+place.name+'</span><span id="more"><i class="fa fa-plus-square" aria-hidden="true"></i></span>');
                li.append(clubName);

                li.append(indicator);

                var info = $('<div class="info">');
                li.append(info);

                var infoRating = $('<div class="info-details"> Rating: '+place.rating+'</div>')
                info.append(infoRating);

                var infoPrice = $('<div class="info-details"> Price Level: '+place.price_level+'</div>')
                info.append(infoPrice);

                var infoAddy = $('<div class="info-details">'+place.vicinity+'</div>')
                info.append(infoAddy);

                var infoFave = $('<div id="heart"><i class="fa fa-heart-o" aria-hidden="true"></i></div>')
                infoAddy.append(infoFave);

                // console.log(place["opening_hours"]["open_now"])
                // console.log(Object.keys(place));

                 /* event , target, handler */
                $(li).on('click', '#more' , function() {
                      if(!li.hasClass('expanded')){
                          li.addClass('expanded');
                          li.find( "#more" ).html('<i class="fa fa-minus-square" aria-hidden="true"></i>')
                      }else{
                        li.removeClass('expanded');
                        li.find( "#more" ).html('<i class="fa fa-plus-square" aria-hidden="true"></i>')
                      }
                    });

                 $(li).on('click', '#heart' , function() {
                      if(!li.hasClass('hearted')){
                          li.addClass('hearted');
                          li.find( "#heart" ).html('<i class="fa fa-heart" aria-hidden="true"></i></i>')
                      }else{
                          li.removeClass('hearted');
                          li.find( "#heart" ).html('<i class="fa fa-heart-o" aria-hidden="true"></i>')
                      }
                    });

                google.maps.event.addListener(marker, 'click', function() {
                  // map.setCenter(marker.getPosition());
                  infowindow.setContent(place.name);
                  infowindow.open(map, this);
                });

                //assign active class to this and remove it off it's friends  
                google.maps.event.addDomListener(marker, 'click', function() {
                      li.siblings().removeClass('active');
                      li.addClass('active');
                  });

                //on hover trigger this marker
                li.on('hover', function(){
                  google.maps.event.trigger(marker, 'click');
                });

        } 
    
        //Reference the Markers
        function setMapOnAll(map) {
              for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
              }
        }  
        //Erase em'
        function clearMarkers() {
          listBox.html('');
          setMapOnAll(null);
          markers = [];
        }
        function getRandomLoc(){
          listBox.html('');
          clearMarkers();
          random = randomCities[Math.floor(Math.random()*randomCities.length)]
          console.log(random)
          getLocalClubs(random)
        }

        //Controller Stuff
        $('#get-loc').on('click', function(){
            showLoader();
            getCurrentLocation();

        })

        $('#get-clubs').on('click', function(){
            console.log(currentLocation);
            showLoader();
            getLocalClubs();

        });

        $('#get-random').on('click', function(){
            getRandomLoc();

        });

        $('#clear-markers').on('click', function(){
            clearMarkers();

        });

        // $('#get-clubs').click();

      }

      // init()

// });
