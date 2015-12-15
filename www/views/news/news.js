'Use Strict';
angular.module('App').controller('newsController', function (News, $firebaseArray, $scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {

  if (window.StatusBar) {
    StatusBar.styleBlackTranslucent();
  }

  // create a connection to Firebase
  var ref = new Firebase(FURL);
  var newsRef = ref.child('news');

  // create a scrollable reference
  var scrollRef = new Firebase.util.Scroll(newsRef, '$priority');

  // create a synchronized array on scope
  $scope.news = $firebaseArray(scrollRef);
  // load the first three news
  scrollRef.scroll.next(3);

  // This function is called whenever the user reaches the bottom
  $scope.loadMore = function() {
    // load the next contact
    scrollRef.scroll.next(2);
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  $scope.openNew = function(e) {
    e.preventDefault();
    console.log(e.target);
    window.open(e.target.href,"_blank","location=yes"); 

  }

}
);
