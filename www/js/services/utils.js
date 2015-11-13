angular.module('App').factory('Utils', function($ionicLoading,$ionicPopup) {

	var Utils = {

    show: function() {
      $ionicLoading.show({
  	    animation: 'fade-in',
  	    showBackdrop: false,
  	    maxWidth: 200,
  	    showDelay: 500,
        template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
      });
    },

    hide: function(){
      $ionicLoading.hide();
    },

		alertshow: function(tit,msg){
			var alertPopup = $ionicPopup.alert({
				title: tit,
				template: msg
			});
			alertPopup.then(function(res) {
				//console.log('Registrado correctamente.');
			});
		},

		errMessage: function(err) {

	    var msg = "Unknown Error...";

	    if(err && err.code) {
	      switch (err.code) {
	        case "EMAIL_TAKEN":
	          msg = "This Email has been taken."; break;
	        case "INVALID_EMAIL":
	          msg = "Invalid Email."; break;
          case "NETWORK_ERROR":
	          msg = "Network Error."; break;
	        case "INVALID_PASSWORD":
	          msg = "Invalid Password."; break;
	        case "INVALID_USER":
	          msg = "Invalid User."; break;
	      }
	    }
			Utils.alertshow("Error",msg);
	  },

    linkify_entities : function(tweet) {
        if (!(tweet.entities)) {
            return escapeHTML(tweet.text)
        }
        
        // This is very naive, should find a better way to parse this
        var index_map = {}
        
        $.each(tweet.entities.urls, function(i,entry) {
            index_map[entry.indices[0]] = [entry.indices[1], function(text) {return "<a href='"+escapeHTML(entry.url)+"'>"+escapeHTML(entry.display_url)+"</a>"}]
        })
        
        $.each(tweet.entities.hashtags, function(i,entry) {
            index_map[entry.indices[0]] = [entry.indices[1], function(text) {return "<a href='http://twitter.com/search?q="+escape("#"+entry.text)+"'>"+escapeHTML(text)+"</a>"}]
        })
        
        $.each(tweet.entities.user_mentions, function(i,entry) {
            index_map[entry.indices[0]] = [entry.indices[1], function(text) {return "<a title='"+escapeHTML(entry.name)+"' href='http://twitter.com/"+escapeHTML(entry.screen_name)+"'>"+escapeHTML(text)+"</a>"}]
        })
        
        $.each(tweet.entities.media || [], function(i,entry) {
            index_map[entry.indices[0]] = [entry.indices[1], function(text) {return "<img src='"+escapeHTML(entry.media.media_url_https || entry.media_url)+"'></img>"}];
        });
        
        var result = ""
        var last_i = 0
        var i = 0
        
        // iterate through the string looking for matches in the index_map
        for (i=0; i < tweet.text.length; ++i) {
            var ind = index_map[i]
            if (ind) {
                var end = ind[0]
                var func = ind[1]
                if (i > last_i) {
                    result += escapeHTML(tweet.text.substring(last_i, i))
                }
                result += func(tweet.text.substring(i, end))
                i = end - 1
                last_i = end
            }
        }
        
        if (i > last_i) {
            result += escapeHTML(tweet.text.substring(last_i, i))
        }
        
        return result
    }

  };

	return Utils;

});

function escapeHTML(text) {
  return $('<div/>').text(text).html()
}


