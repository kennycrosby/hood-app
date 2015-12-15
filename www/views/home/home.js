'Use Strict';
angular.module('App').controller('homeController', function ($scope, $state, Auth, $location, FURL, $firebaseAuth, $firebaseObject, $rootScope, $ionicPopup, Utils) {

  var ref = new Firebase(FURL);
  var profilesRef = ref.child('profile');
  var auth = $firebaseAuth(ref);

  auth.$onAuth(function(authData) {
    if (authData) {
      console.log("Logged in as:", authData.uid);
      ref.child('profile').orderByChild("id").equalTo(authData.uid).on("child_added", function(snapshot) {
        userkey = snapshot.key();
        var obj = $firebaseObject(ref.child('profile').child(userkey));
        
        // Set global current user
        $rootScope.currentUser = obj;

        console.log('obj from homeController', obj);
        
        obj.$loaded()
          .then(function(data) {
            if (obj.firstlogin) {
              // Update the firstlogin attr
              var accountRef = profilesRef.child(obj.$id);
              accountRef.update({
                'firstlogin' : false
              }, function() {
                console.log('the user has now logged in at least once');
                showPopup();
              });

            } else {
              console.log('The user has logged in before'); 
            }
          });
      });

    } else {
      console.log("Logged out");
    }
  });

  var showPopup = function() {

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
        template: '',
        title: 'Welcome!',
        subTitle: 'Please update your account password.',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'button-positive',
            onTap: function(e) {
              $state.go('account', { userId : $rootScope.currentUser.id });
            }
          }
        ]
    });
  }

  $scope.logOut = function () {
    Auth.logout();
    $location.path('/login');
  }

  $scope.navigate = function(page) {
    $state.go(page);
  }

}
);
