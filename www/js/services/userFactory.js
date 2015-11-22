ffe.factory('userFactory', function() {
  var user = {};
  var service = {};

  service.getUser = function () {
  	console.log("Returning user with #: ", this.user);
    return this.user;
  };

  service.setUser = function (user) {
    this.user = user;
    console.log("Setting user", this.user);
  };

  return service;
});


