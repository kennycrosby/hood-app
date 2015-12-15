'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages', 'ion-affix', 'ngIOS9UIWebViewPatch'])
// Changue this for your Firebase App URL.
.constant('FURL', 'https://hoodapp.firebaseio.com/')

.factory('FBAuth', function($firebaseAuth, FURL) {
    var ref = new Firebase(FURL);
    console.log(ref);
    return $firebaseAuth(ref);
  }
)

.run(function($ionicPlatform, $rootScope, $firebaseAuth, FURL, $state, $firebaseObject, FBAuth) {

  // for ui-router
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    console.log('state change error', error);
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      console.log('auth required!!');
      $state.go("login");
    }
  });

  $ionicPlatform.ready(function() {

    if (window.StatusBar) {
      StatusBar.show();
      StatusBar.styleBlackTranslucent();
    } 
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.disableScroll(true);
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.cordova) {
      window.open = cordova.InAppBrowser.open;
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html',
      controller:'homeController',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["FBAuth", function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return Auth.$requireAuth();
        }]
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["FBAuth", function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return Auth.$waitForAuth();
        }]
      }
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })
    .state('explore', {
      url: '/explore',
      templateUrl: 'views/explore/explore.html',
      controller:'exploreController'
    })
    .state('people', {
      url: '/people',
      templateUrl: 'views/people/people.html',
      controller:'peopleController'
    })
    .state('profile', {
      url: '/profile/:userId',
      templateUrl: 'views/profile/profile.html',
      controller:'profileController'
    })
    .state('account', {
      url: '/account/:userId',
      templateUrl: 'views/account/account.html',
      controller:'accountController'
    })
    .state('news', {
      url: '/news',
      templateUrl: 'views/news/news.html',
      controller:'newsController'
    })
    ;
    $urlRouterProvider.otherwise(function($injector, $location){
      var $state = $injector.get("$state");
      $state.go('home');
    });
});
