angular.module('App').factory('Explore', function(FURL, $firebaseArray, $firebaseObject, $rootScope, Utils) {

  var ref = new Firebase(FURL),
      placesRef = ref.child('places'),
      prevRandomNum;

  return {

    init: function () {
      var self = this;
      // update size of image container
      // var totalHeight = $('.scroll').height();
      // console.log('totalHeight', totalHeight);
      // var dynamicHeight = Math.floor(totalHeight / 2.5);
      // $('.explore-page').find('.item-image').css('height', dynamicHeight + 'px');
      // $('.bottom-content').css('min-height', dynamicHeight-7 + 'px');
    },

    allPlaces : {},

    all: function () {
      var dfdPlaces = $.Deferred();
      var self = this;

      $firebaseArray( placesRef ).$loaded().then(function(places){
        self.allPlaces = places;
        dfdPlaces.resolve(places);
      });

      return dfdPlaces.promise();
    },

    getRandomPlace: function(type, places) {

      var self = this;
      //var dfdRandomPlace = $.Deferred();

      var checkNum = setInterval(function(){
        var rNum = Math.floor((Math.random() * places.length) + 0);
        if (rNum != prevRandomNum) {
          self.getGooglePlaceData(places[rNum].id);
          prevRandomNum = rNum;
          clearInterval(checkNum);
        };
      }, 100);

      //return dfdRandomPlace.promise();
    },

    getGooglePlaceData: function(placeID, callback) {


      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.866, lng: 151.196},
        zoom: 16
      });
      var infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);

      service.getDetails({
        placeId: placeID
      }, function(place, status) {
        console.log('place', place);
        
        if (place.photos) {
          var imgs = place.photos;
          for (var i = 0; i < imgs.length; i++){
            place.photos[i].myUrl = imgs[i].getUrl({'maxWidth': 800, 'maxHeight': 800});
            if (i+1 === imgs.length) {
              $rootScope.$broadcast('place:updated', place);
            };
          }  
        } else {
          $rootScope.$broadcast('place:updated', place);
        }

        // if (status === google.maps.places.PlacesServiceStatus.OK) {

        //   var marker = new google.maps.Marker({
        //     map: map,
        //     position: place.geometry.location
        //   });
        //   var latLng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng() );
        //   // map.setCenter(latLng);

        //   google.maps.event.addListener(marker, 'click', function() {
        //     infowindow.setContent(place.name);
        //     infowindow.open(map, this);
        //   });
          
        //   google.maps.event.addListenerOnce(map, 'idle', function() {
        //     google.maps.event.trigger(map, 'resize');
        //     map.setCenter(latLng);
        //     map.setOptions({styles: styleArray});
        //   });
        // }

        
      });

    },

    updateImages : function() {

      console.log('ITS LOADED');
      var $img = $('.explore-img'),
          $container = $('.explore-page').find('.item-image');

      if ($('.explore-img').height() <= $('.explore-page').find('.item-image').height()) {
        $img.css({'height' : '100%','width' : 'auto'});
        if ($img.width() < $container.width()) {
          $img.css({'height' : 'auto','width' : '100%'});
        };
      } else {
        $img.css({'height' : 'auto','width' : '100%'});
      }

    }
  }

});

var styleArray = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]