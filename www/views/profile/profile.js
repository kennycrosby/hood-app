'Use Strict';
angular.module('App').controller('profileController', function ($scope, $state, $stateParams, $cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, People) {

  var dfdPerson = People.get($stateParams.userId);

  dfdPerson.then(function(value){
    console.log('value', value);
    $scope.person = value;
  });

  
}
);
