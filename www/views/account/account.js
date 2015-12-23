'Use Strict';
angular.module('App').controller('accountController', function ($scope, $ionicHistory, $cordovaCamera, $rootScope, $state, $stateParams, $cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils, People) {

  var dfdPerson = People.get($stateParams.userId);

  var ref = new Firebase(FURL);
  var profilesRef = ref.child('profile');
  
  $scope.imageData = '';

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  $scope.upload = function() {
    
    var options = {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
        console.log('imageData', imageData);
        $scope.person.dataImage = imageData;
        $scope.imageData = imageData;
    }, function(error) {
        console.error(error);
    });
    
  }

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
          Utils.hide();
        } else {
          console.log('Synchronization succeeded');
          if (person.newpassword) {
            changePassword();
          } else {
            Utils.hide();
            Utils.alertshow('Success','Account updated successfully.');
          }
        }
      };

      var changePassword = function() {
        accountRef.changePassword({
          email: person.email,
          oldPassword: person.oldpassword,
          newPassword: person.newpassword
        }, function(error) {
          if (error) {
            switch (error.code) {
              case "INVALID_PASSWORD":
                console.log("The specified user account password is incorrect.");
                Utils.alertshow('The specified user account password is incorrect.');
                Utils.hide();
                break;
              case "INVALID_USER":
                console.log("The specified user account does not exist.");
                Utils.alertshow('The specified user account does not exist.');
                Utils.hide();
                break;
              default:
                console.log("Error changing password:", error);
            }
          } else {
            console.log("User password changed successfully!");
            Utils.hide();
            Utils.alertshow('Successfully','Account updated and password changed successfully.');
          }
        });
      }

      ref.authWithPassword({
        email    : person.email,
        password : person.oldpassword
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          accountRef.update({
            'phone' : person.phone ? person.phone : '',
            'facebook' : person.facebook ? person.facebook : '',
            'instagram' : person.instagram ? person.instagram : '',
            'twitter' : person.twitter ? person.twitter : '',
            'dataImage' : $scope.imageData ? $scope.imageData : ''
          }, onComplete);
        }
      });

            

      

    }
  };

  dfdPerson.then(function(value){
    $scope.person = value;
  });

}
);
