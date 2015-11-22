ffe.controller('mainController', ['$scope', '$state', '$ionicPopup', '$ionicSideMenuDelegate', '$ionicModal', '$http', 'userFactory',
  function ($scope, $state, $ionicPopup, $ionicSideMenuDelegate, $ionicModal, $http, userFactory) {


    //Retrieves current user
    var currUser = {};

    var reset_item_fields = function () {
      $scope.item = {
        title: "",
        img: "",
        description: "",
        category: "",
        tags: "",
        contact: "",
        location: "",
        likes: ""
      };
    };
    reset_item_fields();

    $scope.getAllObjects = function () {
      $.ajax({
        url: 'http://ffe-api-reboot.mybluemix.net/items',
        crossDomain: true,
        method: 'GET',
        xhrFields: {
          withCredentials: true
        },
        success: function (res) {
          $scope.listings = res.reverse();
        }
        // success: $scope.sendConfirmationSMS(interestMSG)
      });
    };

    $scope.timeAgo = function(date) {
      return moment(date).startOf('seconds').fromNow();
    };

    $scope.doRefresh = function () {
      $scope.getAllObjects();
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply();
    };

    //$scope.doRefresh();
    $scope.getAllObjects();
    $scope.createListing = function () {
      // console.log($scope.item);
      // $scope.currUser      = userFactory.getUser();
      $scope.currUser = userFactory.getUser();
      console.log($scope.currUser);
      console.log("User phone number: ", $scope.currUser.telephone);
      confirmCreate();
    };

    $ionicModal.fromTemplateUrl('templates/modals/create_listing.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.create_listing_modal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/modals/listing_detail.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.listing_details_modal = modal;
    });

    $scope.showDetail = function (listing) {
      $scope.selected_item = listing;
      $scope.listing_details_modal.show();
    };

    $scope.goProfile = function () {
      $state.go("profile");
    };

    $scope.goHome = function () {
      console.log("ASDA");
      $state.go('home');
    };

    var confirmCreate = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: "Creating",
        template: "Are you sure you want to create this item?"
      });
      confirmPopup.then(function (res) {
        if (res) {
          console.log("Sending request to create item");
          // Test SMS functionality
          $scope.currUser = userFactory.getUser();
          var confirmMSG = "Thank you, " + $scope.currUser.name + " for using Free for Everyone! Your item has been publically listed."
          $scope.sendConfirmationSMS(confirmMSG);

          console.log($scope.item.tags);
          var splitTags = $scope.item.tags.toString().split('#');
          splitTags.clean();

          $.ajax({
              url: 'http://ffe-api-reboot.mybluemix.net/items/create',
              data: { // TODO: Replace with actual fucking data
                title: $scope.item.title,
                description: $scope.item.description,
                location: $scope.item.location,
                category: $scope.item.category,
                tags: splitTags,
                is_taken: false
              },
              crossDomain: true,
              method: 'POST',
              xhrFields: {
                withCredentials: true
              },
              // success: $scope.sendConfirmationSMS(confirmMSG)
              success: $scope.listings.push($scope.item)
            }
          );

          $scope.create_listing_modal.hide();
          reset_item_fields();
        } else {
          console.log("no action taken");
        }
      });
    };

    // TODO: $scope.selected_item.title needs to be updated to the one that is being clicked on
    $scope.lockThisItem = function () {
      console.log("An item has been locked!");
    };

    $scope.submitInterest = function () {
      $scope.currUser = userFactory.getUser();
      console.log("This item was indicated ", $scope.selected_item.title);
      console.log("Submitting interest for this user: ", $scope.currUser.email);

      // Send a sms message indicating that you are now subscribed to this item.

      var interestMSG = "Hello," + $scope.currUser.name + " for using Free for Everyone! You have been subscribed to: " + $scope.selected_item.title;
      console.log(interestMSG);
      // Send a post request to this route to be handled.
      var tempID =  $scope.selected_item._id;
      var teleNum = $scope.currUser.telephone;
      $.ajax({
        url: 'http://ffe-api-reboot.mybluemix.net'+ tempID + '/like',
        data: {
          tel: teleNum,
          id: tempID
        },
        crossDomain: true,
        method: 'POST',
        xhrFields: {
          withCredentials: true
        },
        success: $scope.sendItemInterestSMS($scope.selected_item.title)
      });
        console.log($scope.selected_item.title);

    };

    $scope.logOut = function () {
      $.ajax({
        url: "http://ffe-api-reboot.mybluemix.net/login/destroy",
        crossDomain: true,
        method: 'POST',
        xhrFields: {
          withCredentials: true
        }
      }).then(function (res) {
        $state.go('start');
      })
    };

    $ionicModal.fromTemplateUrl('templates/modals/create_listing.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.create_listing_modal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/modals/listing_detail.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.listing_details_modal = modal;
    });

    $scope.goProfile = function () {
      $state.go("profile");
    };

    $scope.goHome = function () {
      console.log("ASDA");
      $state.go('home');
    };

    $scope.toggleLeft = function () {
      console.log('toggling');
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.sendConfirmationSMS = function () {
      var confirmMSG = "Thank you, " + $scope.currUser.name + " for using Free for Everyone! Your item has been publically listed."
      var data = JSON.stringify({
        "call": {
          // "no": "14087998066",
          "no": $scope.currUser.telephone,
          "caller_id_no": "19492366013"
        },
        "message": confirmMSG
      });

      var config = {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'LmQxkLomw8seszAR29n0LcGaOCvp1ibj'
        }
      };

      console.log("Making a shoutpoint sms post: " + data)

      $http.post('https://api.shoutpoint.com/CORS/v0/Dials/SMS', data, config)
        .success(function (data, status, headers, config) {
          console.log("Item has been posted, success!")
          $scope.PostDataResponse = data;
        }).error(function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
        });
    };

      $scope.sendItemInterestSMS = function (name) {
      var confirmMSG = "Hi " 
      + $scope.currUser.name 
      + ", thanks for using Free for Everyone! You'll now get updates for " 
      + name;
      var data = JSON.stringify({
        "call": {
          // "no": "14087998066",
          "no": $scope.currUser.telephone,
          "caller_id_no": "19492366013"
        },
        "message": confirmMSG
      });

      var config = {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'LmQxkLomw8seszAR29n0LcGaOCvp1ibj'
        }
      };

      console.log("Making a shoutpoint sms post: " + data)

      $http.post('https://api.shoutpoint.com/CORS/v0/Dials/SMS', data, config)
        .success(function (data, status, headers, config) {
          console.log("Interest success!")
          $scope.PostDataResponse = data;
        }).error(function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
        });
    };
  }]);




