
// // $(document).ready(function(){
        
//    function initMap(){

//         //SF
//         var defaultLocation = {lat: 37.773972, lng: -122.431297};
//         // Toyko
//         var defaultLocation = {lat: 35.6895, lng: 139.6917};

//         //Barcelona
//         // var defaultLocation = {lat: 41.3851, lng: 2.1734};
        
//         //Verona
//         // var defaultLocation = {lat: 45.4384, lng: 10.9916};

//         //Lisbon
//         // var defaultLocation = {lat: 38.712815, lng: -9.2417338};

//         var currentLocation = {};
//         var infoWindow;

//         var iconBase = 'http://localhost:8888/final/images/';
//           var icons = {
//             parking: {
//               icon: iconBase + 'club_icon.png'
//             },
//             you_are_here: {
//               icon: iconBase + 'here.png'
//             },
//             info: {
//               icon: iconBase + 'info-i_maps.png'
//             }
//           };
//           var listBox = $('.club-info');
//           var clubNames = [];

//         var map = new google.maps.Map(document.getElementById('map'), {
//           center: defaultLocation,
//           zoom: 11,
//            styles: [
//             {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
//             {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
//             {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
//             {
//               featureType: 'administrative.locality',
//               elementType: 'labels.text.fill',
//               stylers: [{visibility: 'off'}]
//             },
//             {
//               featureType: 'poi',
//               elementType: 'labels.text.fill',
//               stylers: [{visibility: 'off'}]
//             },
//             {
//               featureType: 'poi.park',
//               elementType: 'geometry',
//               stylers: [{visibility: 'off'}]
//             },
//             {
//               featureType: 'poi.park',
//               elementType: 'labels.text.fill',
//               stylers: [{visibility: 'off'}]
//             },
//             {
//               featureType: 'road',
//               elementType: 'geometry',
//               stylers: [{color: '#38414e'}]
//             },
//             {
//               featureType: 'road',
//               elementType: 'geometry.stroke',
//               stylers: [{color: '#212a37'}]
//             },
//             {
//               featureType: 'road',
//               elementType: 'labels.text.fill',
//               stylers: [{color: '#9ca5b3'}]
//             },
//             {
//               featureType: 'road.highway',
//               elementType: 'geometry',
//               stylers: [{color: '#746855'}]
//             },
//             {
//               featureType: 'road.highway',
//               elementType: 'geometry.stroke',
//               stylers: [{visibility: 'off'}]
//             },
//             {
//               featureType: 'road.highway',
//               elementType: 'labels.text.fill',
//               stylers: [{visibility: 'off'}]
//             },
//             {
//               featureType: 'transit',
//               elementType: 'geometry',
//               stylers: [{visibility: 'off'}]
//             },
//             {
//               featureType: 'transit.station',
//               elementType: 'labels.text.fill',
//               stylers: [{visibility: 'off'}]
//             },
//             {
//               featureType: 'water',
//               elementType: 'geometry',
//               stylers: [{color: '#17263c'}]
//             },
//             {
//               featureType: 'water',
//               elementType: 'labels.text.fill',
//               stylers: [{visibility: 'off'}]
//             },
//             {
//               featureType: 'water',
//               elementType: 'labels.text.stroke',
//               stylers: [{color: '#17263c'}]
//             }
//           ]
//         });

//         //Get current Location
//         $('#getLoc').on('click', function getCurrentLocation(){
        
//         listBox.html('');

//         var infoWindow = new google.maps.InfoWindow({map: map});
//         // $('#triangles').show();

//           // Try HTML5 geolocation.
//           if (navigator.geolocation) {

//             navigator.geolocation.getCurrentPosition(function(position) {
//               var pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//               };

//               icon: icons['parking'].icon,
//               infoWindow.setPosition(pos);
//               infoWindow.setContent('Location found.');
//               map.setCenter(pos);
              
//               //Set object do your current location
//               currentLocation = pos;

//             }, function() {
//               handleLocationError(true, infoWindow, map.getCenter());
//               $('#triangles').hide();
//             });
//           } else {
//             // Browser doesn't support Geolocation
//             handleLocationError(false, infoWindow, map.getCenter());
//           }

          

//         })

//         function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//         infoWindow.setPosition(pos);
//         infoWindow.setContent(browserHasGeolocation ?
//                               'Error: The Geolocation service failed.' :
//                               'Error: Your browser doesn\'t support geolocation.');
//         }

//         $('#getParty').on('click', function(){
          
//           $('#triangles').show();

//           infowindow = new google.maps.InfoWindow();
//           var service = new google.maps.places.PlacesService(map);
          
//           //If the location is empty set the default to current
//           if($.isEmptyObject(currentLocation)){
//              currentLocation = defaultLocation;
//           }

//           service.nearbySearch({
//             location: currentLocation,
//             radius: 10000,
//             type: ['night_club']
//           }, callback);

//           function callback(results, status) {
//             if (status === google.maps.places.PlacesServiceStatus.OK) {
//               for (var i = 0; i < results.length; i++) {
//                 // console.log(results[i]);
//                 // renderList(results[i]);
//                 createMarker(results[i]);
//                 clubNames.push(results[i].name);

//               }
//             }
//             $('#triangles').fadeOut(1000);
//           }


//           // var markersArray = [];
//           // var li;
//             // var li;

//           function createMarker(place) {
//             // var placeLoc = place.geometry.location;
                  
//             var marker = new google.maps.Marker({
//               icon: icons['parking'].icon,
//               map: map,
//               markerId: place.id,
//               position: place.geometry.location
//             });

//             var li = $('<div class="lead">');
//             listBox.append(li);
//             var clubName = '<span class="c-name">'+place.name+'</span><span class="c-rating">'+place.rating+'</span>';
//             li.append(clubName);

//             google.maps.event.addListener(marker, 'click', function() {
//               // console.log(marker);
//               infowindow.setContent(place.name);
//               infowindow.open(map, this);
//             });

//             //assign cctive class to this and remove it off it's friends  
//             google.maps.event.addDomListener(marker, 'click', function() {
//                   li.siblings().removeClass('active');
//                   li.addClass('active');
//               });

//             //on hover trigger this marker
//             li.on('hover', function(){
//               // console.log(li);
//               google.maps.event.trigger(marker, 'click');
//             });

//           }

//           // $('#getParty').click();
//           // console.log(google.maps.Marker.markerId)

//         })
//         // console.log(clubNames);
//         // google.maps.event.trigger(markers[1], 'click');
        
//         // $('#getParty').click();







// //End Init
//    }     

// // });

//                 //   function renderList(data){
//           //      // var list = $('<p class="lead">');
//           //      var li = $('<p class="lead"><span class="c-name">'+data.name+'</span><span class="c-rating">'+data.rating+'</span></p>');
               
//           //      // console.log(li)
//           //      // console.log(li[0].firstChild.innerHTML)
                
//           //       li.on('click', function(){

//           //         console.log(li);

//           //       })

//           //       // google.maps.event.addListener(li, 'click', function(el){
//           //       //   console.log(li);
//           //       //   // alert(0);
//           //       // });
               
//           //      listBox.append(li);
                

//           //      // li.on('click', function(){
//           //      //       // console.log(marker)
//           //      //       console.log(this);                 

//           //      // }) 
//           //      // console.log(list)
//           //      // list.html(data.name);
//           //      // console.log(data);

//           // }
