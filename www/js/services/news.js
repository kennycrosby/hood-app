angular.module('App').factory('News', function(FURL, $firebaseArray, $firebaseObject) {

	// Might use a resource here that returns a JSON array
  var ref = new Firebase(FURL);

  var dfdDays = $.Deferred();
  $firebaseArray(ref.child('news').limitToLast(2).startAt(3)).$loaded().then(function(days){
    dfdDays.resolve(days);
  });

  return {
    all: function () {
      return dfdDays.promise();
    },
    get: function(dayId) {

      var dfdDay = $.Deferred();
      
      dfdDays.then(function(days) {
        for (var i = 0; i < days.length; i++) {
          if (days[i].id === dayId) {
            dfdDay.resolve(days[i]);
          }
        }
      });

      return dfdDay.promise();
      
    }
  }

});