'Use Strict';
angular.module('App').controller('newsController', function (News, $scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  var ref = new Firebase(FURL);


  var dfdNews = News.all();

  dfdNews.then(function(data) {
    console.log('news data', data);
    $scope.news = data;
  });

}
);
