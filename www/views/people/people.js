'Use Strict';
angular.module('App').controller('peopleController', function ($scope, $state, $cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, People) {
  
  if (window.StatusBar) {
    StatusBar.styleBlackTranslucent();
  }

  var ref = new Firebase(FURL);
  var peopleRef = ref.child('profile');

  console.log('people', People);

  var dfdPeople = People.all();

  dfdPeople.then(function(data) {
    $scope.people = data;
  });

}
);
