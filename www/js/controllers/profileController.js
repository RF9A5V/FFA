/**
 * Created by Leslie on 11/21/2015.
 */

ffe.controller('profileController', ['$scope', '$state', '$ionicPopup', '$ionicModal', 'userFactory',
    function ($scope, $state, $ionicPopup, $ionicModal, userFactory) {
  $scope.showWishlist = false;
  $scope.showListings = true;
  $scope.showAdd = false;

  //Retrieves current user
    $scope.currUser = userFactory.getUser();
    console.log($scope.currUser);

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

    $scope.listings = [];

      $scope.getAllObjects = function () {
        $.ajax({
          url: 'http://localhost:1337/items/my_listing/' + $scope.currUser._id,
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

    $scope.logOut = function (){
        $.ajax({
            url: "http://localhost:1337/login/destroy",
            crossDomain: true,
            method: 'POST',
            xhrFields: {
                withCredentials: true
            }
        }).then(function(res){
            $state.go('start');
        })
    };


    $scope.newWish = '';

    $scope.wishlist = [
        {
            title: '#PS4',
        },
        {
            title: '#OldTV',
        },
        {
            title: '#OatmealRaisinCookies',
        },
        {
            title: '#Couch #Sofa',
        }
    ];

    $scope.addTag = function (tag){
        console.log(tag);
        $scope.wishlist.push({title:"#"+tag});
    };

    $scope.backToHome = function () {
        $state.go("home");
    };

    $scope.delete_listing = function (post) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete',
            template: 'Do you want to delete from my favorites?'
        });
        confirmPopup.then(function (res) {
            // TODO: delete the post
            if (res) {
              //$.ajax({
              //  url: 'http://localhost:1337/items/' + post._id,
              //  data: {
              //    id: post._id
              //  },
              //  crossDomain: true,
              //  method: 'DELETE',
              //  xhrFields: {
              //    withCredentials: true
              //  },
              //  success: $scope.wishlist.splice($scope.wishlist.indexOf(post), 1)
              //})
              success: $scope.wishlist.splice($scope.wishlist.indexOf(post), 1);
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
                //$.ajax({
                //  url: 'http://localhost:1337/items/' + post._id,
                //  data: {
                //    id: post._id
                //  },
                //  crossDomain: true,
                //  method: 'DELETE',
                //  xhrFields: {
                //    withCredentials: true
                //  },
                //  success: $scope.wishlist.splice($scope.wishlist.indexOf(post), 1)
                //
                //})
                $scope.wishlist.splice($scope.wishlist.indexOf(post), 1)
            }
        })
    }

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
        if($scope.showWishlist)
        {
          $scope.toggleShowAdd();
        }
        else
        {
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

    $scope.modifyItem = function (data){
        $scope.selectedItem = data;
        $scope.modify_listing_modal.show();
    };

    $scope.updateItem = function (data){
        // TODO: save the updated object
        $scope.modify_listing_modal.hide();
    };

    //$scope.shouldShowDelete = false;
    //$scope.shouldShowReorder = false;
    //$scope.listCanSwipe = true
}]);
