'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages', 'ion-affix'])
.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
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
    .state('home', {
      url: '/home',
      cache: false,
      templateUrl: 'views/home/home.html',
      controller:'homeController'
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
    .state('news', {
      url: '/news',
      templateUrl: 'views/news/news.html',
      controller:'newsController'
    })
    ;
$urlRouterProvider.otherwise("/login");
})
// Changue this for your Firebase App URL.
.constant('FURL', 'https://hoodapp.firebaseio.com/')
.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {

    if (window.StatusBar) {
      StatusBar.show();
      StatusBar.styleDefault();  
    }
    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

  });
})

.filter('capitalize', function() {
  return function(input, all) {
    var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
    return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
  }
})

.filter('cut', function () {
    return function (value, numWords) {
        if (!value) return '';
        numWords = parseInt(numWords);
        if (value.split(/\s+/).length > numWords) {
          return value.split(/\s+/).slice(0,numWords).join(' ');
        } else {
          return value;
        }
    };
})

.filter('tweetLinky',['$filter',
    function($filter) {
        return function(text, target) {
            if (!text) return text;

            var replacedText = $filter('linky')(text, target);
            var targetAttr = "";
            if (angular.isDefined(target)) {
                targetAttr = ' target="' + target + '"';
            }
            // replace #hashtags and send them to twitter
            var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
            replacedText = text.replace(replacePattern1, '$1<a href="https://twitter.com/search?q=%23$2"' + targetAttr + '>#$2</a>');
            // replace @mentions but keep them to our site
            var replacePattern2 = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<a href="https://twitter.com/$2"' + targetAttr + '>@$2</a>');
            return replacedText;
        };
    }
])

.filter('instagramLinky',['$filter',
    function($filter) {
        return function(text, target) {
            if (!text) return text;

            var replacedText = $filter('linky')(text, target);
            var targetAttr = "";
            if (angular.isDefined(target)) {
                targetAttr = ' target="' + target + '"';
            }
            // replace #hashtags and send them to twitter
            var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
            replacedText = text.replace(replacePattern1, '$1<a href="https://www.instagram.com/explore/tags/$2"' + targetAttr + '>#$2</a>');
            // replace @mentions but keep them to our site
            var replacePattern2 = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<a href="https://www.instagram.com/$2"' + targetAttr + '>@$2</a>');
            return replacedText;
        };
    }
]);
