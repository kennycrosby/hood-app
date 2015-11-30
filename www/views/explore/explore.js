'Use Strict';
angular.module('App').controller('exploreController', function ($scope, $firebaseArray, $state, $ionicSlideBoxDelegate, $cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, Explore) {

  // update status bar
  if (window.StatusBar) {
    StatusBar.styleBlackTranslucent();
  }

  // Show the loader
  Utils.show();

  // Explore.init();

  var placeType = 'food',
      placesPromise = Explore.all(),
      filteredPlaces = {};

  // if we already have the data
  if (Explore.allPlaces.length > 0){
    console.log('we have the places already');
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

  $scope.$on('images:updated', function(event, data) {
    $ionicSlideBoxDelegate.slide(0, 0);
    $ionicSlideBoxDelegate.update();
  });

  // Filter the places
  $scope.filter = function(type) {
    Utils.show();
    $(event.target).addClass('active').siblings().removeClass('active');
    filteredPlaces = Explore.allPlaces.filter(function( obj ) {
      return obj.type == type;
    });
    Explore.getRandomPlace(type, filteredPlaces);
  }

  // Get a new place
  $scope.reload = function() {
    Utils.show();
    Explore.getRandomPlace(placeType, filteredPlaces);
  }

  var afterApply = function(data) {
    $('.pricing').find('span').removeClass('priced')
      .each(function(key, val){
        if (key+1 <= data.price_level) {
          $(val).addClass('priced');
        }
      });

    $('.stars').find('span').removeClass('starred')
      .each(function(key,val){
        if (key+1 <= Math.floor(data.rating) ) {
          $(val).addClass('starred');
        }
      });

    var imageCount = 0;
    // ng-src image is loaded
    $scope.imageLoaded = function() {
      
      imageCount++;
      console.log('image loaded', imageCount);
      console.log('$scope.place.photos.length', $scope.place.photos.length);
      if ($scope.place.photos.length === imageCount) {
        console.log('all loaded');
        Explore.updateImages();
      };
    }

    // $ionicSlideBoxDelegate.update();

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
