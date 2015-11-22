/**
 * Created by Leslie on 11/21/2015.
 */

ffe.controller('profileController', ['$scope', '$state', '$ionicPopup', '$ionicModal', '$http', 'userFactory',
    function ($scope, $state, $ionicPopup, $ionicModal, $http, userFactory) {
        var currUser = userFactory.getUser();
        $scope.showWishlist = false;
        $scope.showListings = true;
        $scope.showAdd = false;

        $scope.newWish = '';

        $scope.toggleShowAdd = function () {
            $scope.showAdd = !$scope.showAdd;
        };

        $scope.show_listings = function () {
            $scope.showListings = true;
            $scope.showWishlist = false;
        };

        $scope.show_wishlist = function () {
            $scope.showListings = false;
            $scope.showWishlist = true;
        };

        $scope.listings=[];
        $scope.getMyObjects = function () {
          currUser = userFactory.getUser();

            $.ajax({
                url: 'http://ffe-api-reboot.mybluemix.net/items/my_listings/' + currUser._id,
                crossDomain: true,
                method: 'GET',
                xhrFields: {
                    withCredentials: true
                },
                success: function (res) {
                    console.log(res);
                    $scope.listings = res;
                }
                // success: $scope.sendConfirmationSMS(interestMSG)
            });
        }

        $scope.addTag = function (tag) {
            console.log(tag);
            $scope.wishlist.push({title: "#" + tag});
        };

        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true;
        $scope.noMoreItemsAvailable = false;

        $scope.loadMore = function () {
            $scope.items.push({id: $scope.items.length});
        };

        $scope.backToHome = function () {
            $state.go("home");
        };

        // $scope.delete_listing = function (post) {
        //     var confirmPopup = $ionicPopup.confirm({
        //         title: 'Delete',
        //         template: 'Do you want to delete from my favorites?'
        //     });
        //     confirmPopup.then(function (res) {
        //         // TODO: delete the post
        //         if (res) {
        //             //$.ajax({
        //             //  url: 'http://localhost:1337/items/' + post._id,
        //             //  data: {
        //             //    id: post._id
        //             //  },
        //             //  crossDomain: true,
        //             //  method: 'DELETE',
        //             //  xhrFields: {
        //             //    withCredentials: true
        //             //  },
        //             //  success: $scope.wishlist.splice($scope.wishlist.indexOf(post), 1)
        //             //})
        //             success: $scope.wishlist.splice($scope.wishlist.indexOf(post), 1);
        //         }
        //     });
        // };

        $scope.getMyObjects();
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


        $scope.wishlist = [];

        $scope.addTag = function (tag) {
          currUser = userFactory.getUser();
          console.log(currUser);
          actualAdd(tag, $scope.currUser._id);
        };

        var actualAdd = function (tag, id) {
            console.log(tag, id);
            $.ajax({
                url: 'http://ffe-api-reboot.mybluemix.net/users/wishlist/add/' + id,
                data: {
                    tag: tag
                },
                crossDomain: true,
                method: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                success: function (res) {
                    console.log(res);
                    $scope.alertAdded();
                },
                error: function (err) {
                    console.log(err);
                }
            });
        };


        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true;
        $scope.noMoreItemsAvailable = false;

        $scope.loadMore = function () {
            $scope.items.push({id: $scope.items.length});
        };

        $scope.backToHome = function () {
            $state.go("home");
        };

        $scope.delete_listing = function (post) {
            console.log(post);
            // var intUsers = [post.user_phone_num];
            var intUsers = [];
            var theObjID = post._id;
            var theObj = post.title;

            // Spoof.
            // intUsers.push("14087998066")
            intUsers.push("17146608285")
            intUsers.push("17149445640")
            intUsers.push("14083553211")

            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete / Remove',
                template: 'Do you want to delete ' + theObj +
                 ' from my favorites? You currently have this many people interested: ' + intUsers.length
            });
            confirmPopup.then(function (res) {
                // TODO: delete the post
                if (res) {
                    $scope.listings.splice($scope.listings.indexOf(post), 1);

                    console.log("Item removed. Sending messages to this many users: " + intUsers.length)

                    for(var i = 0; i < intUsers.length; ++i){
                        // Iterates through the array and messages the phone numbers.
                        $scope.smsRemove(intUsers[i], theObj);
                    }
                    // Go through the array of the intUsers and send them a message indicating the item has been removed.

                }


            });


            if ($scope.items.length == posts.length) {
                $scope.noMoreItemsAvailable = true;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        //$scope.formatDate = function(date) {
        //  return moment(date).format('MMMM Do YYYY');
        //};


        $scope.delete_wish = function (post) {
            console.log('delete wish');
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete',
                template: 'Do you want to delete from my shares?'
            });
            confirmPopup.then(function (res) {
                // TODO: delete the post
                if (res) {
                    $scope.wishlist.splice($scope.wishlist.indexOf(post), 1);
                }
            });
        };

        $scope.alertAdded = function () {
            var alertPopup = $ionicPopup.alert({
                title: "Tag added!",
                template: "Your wishlist has been updated!"
            }).then(function (res) {
                $scope.newWish = '';
            })
        };

        $scope.doRefresh = function () {
            //TODO: get new favorite posts and shares
            $scope.getMyObjects();
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.addToWishlist = function () {
            $scope.wishlist.push();
        };

        $ionicModal.fromTemplateUrl('templates/modals/create_listing.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.create_listing_modal = modal;
        });

        $scope.openModal = function () {
            if ($scope.showWishlist) {
                $scope.toggleShowAdd();
            }
            else {
                $scope.create_listing_modal.show();
            }
        };
        $scope.closeModal = function () {
            $scope.create_listing_modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.create_listing_modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });

        $ionicModal.fromTemplateUrl('templates/modals/modify_listing.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modify_listing_modal = modal;
        });

        $scope.modifyItem = function (data) {
            $scope.selectedItem = data;
            $scope.modify_listing_modal.show();
        };

        $scope.updateItem = function (data) {
            // TODO: save the updated object
            var splitTags = $scope.selectedItem.tags.toString().split('#');
            splitTags.clean();
            $.ajax({
                url: 'http://localhost:1337/items/edit/' + $scope.selectedItem._id,
                data: { // TODO: Replace with actual fucking data
                  title: $scope.selectedItem.title,
                  description: $scope.selectedItem.description,
                  location: $scope.selectedItem.location,
                  category: $scope.selectedItem.category,
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
            $scope.modify_listing_modal.hide();
        };

        /*  SMS Function to send to users */
        $scope.smsRemove = function (tel, titleOfItem) {

            console.log("Texting this person #: " , tel)
            // use $.param jQuery function to serialize data from JSON
            var data = JSON.stringify({
                "call": {
                    // "no": "14083553211", // One of our test numbers
                    // "no": "17149445640",
                    "no": tel,
                    "caller_id_no": "19492366013"
                },
                "message": "Hello, this is a courtesy notice that the item "
                + titleOfItem + " has been claimed. "
            });

            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': 'LmQxkLomw8seszAR29n0LcGaOCvp1ibj'
                }
            };

            $http.post('https://api.shoutpoint.com/CORS/v0/Dials/SMS', data, config)
                .success(function (data, status, headers, config) {
                    console.log("Success!")
                    $scope.PostDataResponse = data;
                })

                .error(function (data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                });
        };

        //$scope.shouldShowDelete = false;
        //$scope.shouldShowReorder = false;
        //$scope.listCanSwipe = true
    }]);


