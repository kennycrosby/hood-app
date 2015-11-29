angular.module('App').factory('People', function(FURL, $firebaseArray, $firebaseObject) {

  var ref = new Firebase(FURL);
  var dfdPeople = $.Deferred();


	// Might use a resource here that returns a JSON array
  return {
    peopleData : {},
    all: function () {
      
      var self = this;
      $firebaseArray( ref.child('profile').orderByChild('firstname') ).$loaded().then(function(people){
        self.peopleData = people;
        dfdPeople.resolve(people);
      });

      return dfdPeople.promise();
    },
    get: function(userId) {

      var dfdPerson = $.Deferred();
      var self = this;

      if (this.peopleData.length > 0) {
        self.filterPerson(dfdPerson, this.peopleData, userId);
      } else {
        this.all();
        dfdPeople.then(function(people) {
          self.filterPerson(dfdPerson, people, userId);
        });
      }

      return dfdPerson.promise();
      
    },
    filterPerson : function(dfd, people, id) {
      for (var i = 0; i < people.length; i++) {
        if (people[i].id === id) {
          dfd.resolve(people[i]);
        }
      }
    }
  }
});