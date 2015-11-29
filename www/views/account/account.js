'Use Strict';
angular.module('App').controller('accountController', function ($scope, $rootScope, $state, $stateParams, $cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, People) {

  var dfdPerson = People.get($stateParams.userId);

  var ref = new Firebase(FURL);
  var profilesRef = ref.child('profile');
  var accountRef;

  $scope.updateAccount = function(person) {
    
    var accountRef = profilesRef.child(person.$id);

    if(angular.isDefined(person)){
      Utils.show();
      console.log(person);

      // Same as the previous example, except we will also display an alert
      // message when the data has finished synchronizing.
      var onComplete = function(error) {
        if (error) {
          console.log('Synchronization failed');
          Utils.errMessage(error);
        } else {
          console.log('Synchronization succeeded');
          Utils.hide();
          Utils.alertshow('Successfully','Account updated successfully.');
        }
      };

      accountRef.update({
        'phone' : person.phone ? person.phone : '',
        'facebook' : person.facebook ? person.facebook : '',
        'instagram' : person.instagram ? person.instagram : '',
        'twitter' : person.twitter ? person.twitter : ''
      }, onComplete);

    }
  };

  dfdPerson.then(function(value){
    $scope.person = value;
  });

}
);
