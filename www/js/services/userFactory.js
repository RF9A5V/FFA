ffe.factory('userFactory', function() {
  var user = {};
  var service = {};

  service.getUser = function () {
    return this.user;
  };

  service.setUser = function (user) {
    this.user = user;
    console.log("Setting user", this.user);
  };

  service.setUserId = function (id) {
    $.ajax({
      url: "http://ffe-api-reboot.mybluemix.net/users/find/" +id,
      success: function (data,text,jq) {
        if (data != undefined) {
          service.setUser(data);
        }
      },
      crossDomain: true,
      method: 'GET',
      xhrFields: {
        withCredentials: true
      }
    });
  };

  return service;
});


