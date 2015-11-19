'Use Strict';
angular.module('App').controller('exploreController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, GetData) {

  Utils.show();

  if (window.StatusBar) {
    StatusBar.styleBlackTranslucent();
  }

  var setPlace = function(placeData){
    // Get a large image
    placeData.image_url = placeData.image_url.replace('ms.jpg', 'l.jpg');
    console.log('placeData', placeData);
    $scope.place = placeData;
    Utils.hide();
  };

  GetData.getRandomFood().then(setPlace);

  $scope.reload = function() {
    Utils.show();
    GetData.getRandomFood().then(setPlace);
  }

}
);
