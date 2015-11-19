'Use Strict';
angular.module('App').controller('exploreController', function ($scope, $firebaseArray, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, Explore) {

  // update status bar
  if (window.StatusBar) {
    StatusBar.styleBlackTranslucent();
  }

  // Show the loader
  Utils.show();

  Explore.init();

  var placeType = 'food',
      placesPromise = Explore.all(),
      filteredPlaces = {};

  // if we already have the data
  if (Explore.allPlaces.length > 0){
    filteredPlaces = Explore.allPlaces.filter(function( obj ) {
      return obj.type == placeType;
    });
    // get the data
    Explore.getRandomPlace(placeType, filteredPlaces);
  } else {
    // filter the data by the type
    // grab a random google place ID
    placesPromise.then(function(places){
      filteredPlaces = places.filter(function( obj ) {
        return obj.type == placeType;
      });
      Explore.getRandomPlace(placeType, filteredPlaces);
    });
  }

  $scope.$on('place:updated', function(event, data) {
    // update the scope
    $scope.place = data;
    $scope.$apply(afterApply(data));
    Utils.hide();
  });

  var afterApply = function(data) {
    $('.pricing').find('span').css('font-weight', '500')
      .each(function(key, val){
        if (key+1 <= data.price_level) {
          $(val).css('font-weight', '900');
        }
      });

    $('.stars').find('span').removeClass('starred')
      .each(function(key,val){
        if (key+1 <= Math.floor(data.rating) ) {
          $(val).addClass('starred');
        }
      });
  }

  // Filter the places
  $scope.filter = function(type) {
    Utils.show();
    $(event.target).addClass('active').siblings().removeClass('active');
    filteredPlaces = Explore.allPlaces.filter(function( obj ) {
      return obj.type == type;
    });
    Explore.getRandomPlace(type, filteredPlaces);
  }

  // ng-src image is loaded
  $scope.imageLoaded = function() {
    Explore.updateImages();
  }

  // Get a new place
  $scope.reload = function() {
    Utils.show();
    Explore.getRandomPlace(placeType, filteredPlaces);
  }

})

.directive('imageonload', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        element.bind('load', function() {
            //call the function that was passed
            scope.$apply(attrs.imageonload);
        });
    }
  };
});
