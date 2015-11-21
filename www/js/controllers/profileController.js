/**
 * Created by Leslie on 11/21/2015.
 */

ffe.controller('profileController', ['$scope','$state', '$ionicPopup', '$ionicModal',function($scope, $state, $ionicPopup, $ionicModal) {

  $scope.showWishlist = false;
  $scope.showListings = true;
  $scope.showAdd = false;

  $scope.toggleShowAdd = function () {
    $scope.showAdd = !$scope.showAdd;
  };

  $scope.show_listings = function (){
    $scope.showListings = true;
    $scope.showWishlist = false;
  };

  $scope.show_wishlist = function () {
    $scope.showListings = false;
    $scope.showWishlist = true;
  };

  $scope.listings = [
    {
      title: 'lol',
      time: '6 seconds ago',
      description: 'Air that is easily breathable'
    },
    {
      title: 'pop',
      time: '46 seconds ago',
      description: 'A free white box in wonderful condition!'
    },
    {
      title: 'hoho',
      time: '2 minutes ago',
      description: "I'm giving away nothing. Just posting for fun :P"
    },
    {
      title: 'yolo',
      time: '5 minutes ago',
      description: 'These descriptions will probably be a lot longer or not...'
    }

  ];

  $scope.wishlist = [
    {
      title: '#PS4',
      time: 'Electronics'
    },
    {
      title: '#OldTV',
      time: 'Electronics'
    },
    {
      title: '#OatmealRaisinCookies',
      time: 'Food'
    },
    {
      title: '#Couch #Sofa',
      time: 'Furniture'
    }
  ];

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;
  $scope.noMoreItemsAvailable = false;

  $scope.loadMore = function() {
    $scope.items.push({id: $scope.items.length});
  };

  $scope.backToHome = function() {
    $state.go("home");
  };

  $scope.delete_listing = function(post) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete',
      template: 'Do you want to delete from my favorites?'
    });
    confirmPopup.then(function(res) {
      // TODO: delete the post
      if (res) {
        $scope.listings.splice($scope.listings.indexOf(post), 1);
      }
    });


    if ( $scope.items.length == posts.length ) {
      $scope.noMoreItemsAvailable = true;
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  //$scope.formatDate = function(date) {
  //  return moment(date).format('MMMM Do YYYY');
  //};

  $scope.getListings = function() {

  };

  $scope.delete_wish = function(post) {
    console.log('delete wish');
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete',
      template: 'Do you want to delete from my shares?'
    });
    confirmPopup.then(function(res) {
      // TODO: delete the post
      if (res) {
        $scope.wishlist.splice($scope.wishlist.indexOf(post), 1);
      }
    });
  };

  $scope.doRefresh = function() {
    //TODO: get new favorite posts and shares
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.addToWishlist = function() {
    $scope.wishlist.push();
  };

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    if($scope.showWishlist)
    {
      $scope.toggleShowAdd();
    }
    else
    {
      $scope.modal.show();
    }
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  //$scope.shouldShowDelete = false;
  //$scope.shouldShowReorder = false;
  //$scope.listCanSwipe = true
}]);
