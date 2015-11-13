angular.module('App').factory('GetData', function(FURL, $firebaseArray, $firebaseObject) {

	var GetData = {

    foodData : undefined,

    getRandomFood: function() {

      var self = this;
      var dfd = $.Deferred();

      // console.log('self.foodData', self.foodData);
      // console.log('self.foodData.length', self.foodData.length);

      var rNum = Math.floor((Math.random() * 19) + 1);
      
      // If the data is in memory then use it, otherwise go get it
      if (self.foodData != undefined) {
        console.log('in here');
        var randomFood = self.foodData.businesses[rNum];
        dfd.resolve(randomFood);
      } else {
        this.yelpAPI(function(){
          var randomFood = self.foodData.businesses[rNum];
          dfd.resolve(randomFood);
        });
      }

      return dfd.promise();

    },
    hide: function(){

    },
		alertshow: function(tit,msg){

		},
		errMessage: function(err) {

    },

    yelpAPI: function(callback) {

      var self = this;

      var auth = {
        //
        // Update with your auth tokens.
        //
        consumerKey : "6bYY1U8dhgFt17noBW5NXQ",
        consumerSecret : "LXEV5iVj-Azb12ub7G8kaFWpK5Q",
        accessToken : "tX6UzxaDaewFyriSB902mFFs4EDUF6Lx",
        // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
        // You wouldn't actually want to expose your access token secret like this in a real application.
        accessTokenSecret : "YpjvnyGiU5JRb6RaPrl0LmmVTjg",
        serviceProvider : {
          signatureMethod : "HMAC-SHA1"
        }
      };

      var terms = 'food';
      var near = '600+california+street';

      var accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret
      };

      parameters = [];
      parameters.push(['term', terms]);
      parameters.push(['location', near]);
      parameters.push(['limit', '20']);   
      parameters.push(['radius_filter', '5000']);    
      parameters.push(['sort', '1']);  
      parameters.push(['callback', 'cb']);
      parameters.push(['oauth_consumer_key', auth.consumerKey]);
      parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
      parameters.push(['oauth_token', auth.accessToken]);
      parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

      var message = {
        'action' : 'http://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
      };

      OAuth.setTimestampAndNonce(message);
      OAuth.SignatureMethod.sign(message, accessor);

      var parameterMap = OAuth.getParameterMap(message.parameters);
      parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
      console.log(parameterMap);

      $.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'cache' : true,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'cb',
        'success' : function(data, textStats, XMLHttpRequest) {
          console.log('data', data);
          self.foodData = data;
          callback();

        }
      });
    }

  };

	return GetData;

});
