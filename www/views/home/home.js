'Use Strict';
angular.module('App').controller('homeController', function ($scope, Auth, $location) {

  // if (window.StatusBar) {
  //   StatusBar.styleDefault();
  // }

  $scope.logOut = function () {
    Auth.logout();
    $location.path('/login');
  }

}
);
