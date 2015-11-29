'Use Strict';
angular.module('App').controller('peopleController', function ($scope, $state, $ionicScrollDelegate, People, Utils) {
  
  if (window.StatusBar) {
    StatusBar.styleBlackTranslucent();
  }

  console.log('People.peopleData', People.peopleData);

  Utils.show();

  if (People.peopleData.length > 0) {
    console.log('we already have the people');
    $scope.people = People.peopleData;
    Utils.hide();
  } else {
    var dfdPeople = People.all();
    dfdPeople.then(function(data) {
      console.log('tryna get the data')
      $scope.people = data;
      Utils.hide();
    });
  }
    
  $scope.query = '';
  // $scope.search = function (person) {
  //   console.log(person);
  //   var query = $scope.query.toLowerCase(),
  //   fullname = person.firstname.toLowerCase() + ' ' + person.lastname.toLowerCase();

  //   if (fullname.indexOf(query) != -1) {
  //     return true;
  //   }
  //   return false;
  // };

  $scope.clearSearch = function() {
    console.log('this is the search');
    $scope.query = '';
  };

  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

  

}
);
