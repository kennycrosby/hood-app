angular.module('App').factory('People', function(FURL, $firebaseArray, $firebaseObject) {

	// Might use a resource here that returns a JSON array
  var ref = new Firebase(FURL);

  var dfdPeople = $.Deferred();
  $firebaseArray(ref.child('profile')).$loaded().then(function(people){
    dfdPeople.resolve(people);
  });

  return {
    all: function () {
      return dfdPeople.promise();
    },
    get: function(userId) {

      var dfdPerson = $.Deferred();
      
      dfdPeople.then(function(people) {
        for (var i = 0; i < people.length; i++) {
          if (people[i].id === userId) {
            dfdPerson.resolve(people[i]);
          }
        }
      });

      return dfdPerson.promise();
      
    }
  }

});