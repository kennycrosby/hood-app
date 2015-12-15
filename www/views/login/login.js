'Use Strict';
angular.module('App').controller('loginController', function ($scope, $rootScope, $firebaseAuth, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);
  var profilesRef = ref.child('profile');

  var userkey = "";
  $scope.signIn = function (user) {
    console.log("Sign in");
    if(angular.isDefined(user)){
    Utils.show();
    Auth.login(user)
      .then(function(authData) {
      console.log("id of the user:" + JSON.stringify(authData));

      ref.child('profile').orderByChild("id").equalTo(authData.uid).on("child_added", function(snapshot) {
        console.log('snapshot.key()', snapshot.key());
        userkey = snapshot.key();
        var obj = $firebaseObject(ref.child('profile').child(userkey));
        console.log('obj', obj);

        // Set global current user
        $rootScope.currentUser = obj;
        
        obj.$loaded()
          .then(function(data) {
            //console.log(data === obj); // true
            //console.log(obj.email);
            $localStorage.email = obj.email;
            $localStorage.userkey = userkey;
            Utils.hide();

            $state.go('home'); 
            
          })
          .catch(function(error) {
            console.error("Error:", error);
          });
      });

      }, function(err) {
        Utils.hide();
        Utils.errMessage(err);
      });
    }
  };

});