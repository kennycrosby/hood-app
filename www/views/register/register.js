'Use Strict';
angular.module('App').controller('registerController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {

  $scope.register = function(user) {
    console.log('user', user);
    if(angular.isDefined(user)){
      Utils.show();
      Auth.register(user)
        .then(function() {
           Utils.hide();
           console.log("Before Log:" + JSON.stringify(user));
           Utils.alertshow("Successfully","The User was Successfully Created.");
           $location.path('/');
        }, function(err) {
           Utils.hide();
           Utils.errMessage(err);
        });
    }
  };

  $scope.registerAll = function() {
    var people = Utils.get_people();
    console.log(people);
    for(var i = 0; i < people.length; i++) {
      console.log(people[i]);
      people[i].phone = '5555555555';
      people[i].password = 'ddb600' + people[i].lastname.toLowerCase();

      Auth.register(people[i])
        .then(function() {
           console.log("Before Log:" + JSON.stringify(user));
        }, function(err) {
           Utils.errMessage(err);
        });
    }
  };

  var ref = new Firebase(FURL);
  var placesRef = ref.child('places');

  $scope.addGooglePlace = function(place) {

    console.log('place.name', place.name);
    console.log('place.id', place.id);
    console.log('place.type', place.type);

    placesRef.push(place);

    placesRef.orderByChild('type').equalTo('food').on('value', function(snapshot){
      console.log(snapshot.val());
    });

    document.getElementById('googleplaceForm').reset();

  }

}
);


