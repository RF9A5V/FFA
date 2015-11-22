ffe.factory('userFactory', function() {
  var user = {};
  var service = {};

  service.getUser = function () {
    return user;
  };

  service.setUser = function (user) {
    this.user = user;
  };

  return service;
});


