'Use Strict';
angular.module('App').controller('exploreController', function ($scope, $rootScope, $firebaseArray, $state, $ionicSlideBoxDelegate, $cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, Explore) {

  Utils.show();

  // update status bar
  if (window.StatusBar) {
    StatusBar.styleBlackTranslucent();
  }

  var placeType = 'food',
      placesPromise = Explore.all(),
      filteredPlaces = {};

  // if we already have the data
  if ($localStorage.allPlaces){
    console.log('we have the places already');
    filteredPlaces = $localStorage.allPlaces.filter(function( obj ) {
      return obj.type == placeType;
    });
    // get the data
    Explore.getRandomPlace(placeType, filteredPlaces);
  } else {
    // filter the data by the type
    // grab a random google place ID
    var removeStartDataFetch = $scope.$on('$locationChangeSuccess', function(evt) {
      placesPromise.then(function(places){
        filteredPlaces = places.filter(function( obj ) {
          return obj.type == placeType;
        });
        Explore.getRandomPlace(placeType, filteredPlaces);
      });
    });

    $scope.$on('$destroy', removeStartDataFetch);
  }

  $scope.$on('place:updated', function(event, data) {
    // update the scope
    $scope.place = data;
    $scope.$apply(afterApply(data));
  });

  $scope.$on('images:updated', function(event, data) {
    $ionicSlideBoxDelegate.slide(0, 0);
    setTimeout(function(){
      $ionicSlideBoxDelegate.update();
      Utils.hide();
      Utils.hideReload();
    }, 500);
  });

  // Filter the places
  $scope.filter = function(type) {
    
    $(event.target).addClass('active').siblings().removeClass('active');
    filteredPlaces = $localStorage.allPlaces.filter(function( obj ) {
      return obj.type == type;
    });

    Utils.showReload(function(){
      Explore.getRandomPlace(type, filteredPlaces);
    });
    
  }

  // Get a new place
  $scope.reload = function() {

    Utils.showReload(function(){
      Explore.getRandomPlace(placeType, filteredPlaces);
    });
    
  }

  $scope.socialShare = function(url) {
    // console.log('fart', url);
    window.plugins.socialsharing.share('Lets go!', null, null, url);
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

    if (!$scope.place.photos) {
      Utils.hide();
      Utils.hideReload();
    };

    var imageCount = 0;
    // ng-src image is loaded
    $scope.imageLoaded = function() {
      imageCount++;
      console.log('image loaded', imageCount);
      console.log('$scope.place.photos.length', $scope.place.photos.length);
      if ($scope.place.photos.length === imageCount) {
        console.log('all loaded');
        Explore.updateImages( $scope.place.photos.length );
      };
    }
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
