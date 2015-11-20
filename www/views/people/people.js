'Use Strict';
angular.module('App').controller('peopleController', function ($scope, $state, $ionicScrollDelegate, People) {
  
  if (window.StatusBar) {
    StatusBar.styleBlackTranslucent();
  }

  $scope.clearSearch = function() {
    console.log('this is the search');
    $scope.search = '';
  };

  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

  var dfdPeople = People.all();

  dfdPeople.then(function(data) {
    $scope.people = data;
  });

}
);
