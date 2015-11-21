/**
 * Created by Leslie on 11/21/2015.
 */

main.controller('MeCtrl', ['$scope', '$ionicModal' ,'$state', 'userFactory', '$ionicPopup',function($scope, $ionicModal, $state, userFactory, $ionicPopup) {

  $scope.setting = function() {
    console.log("going to setting");
    $state.go('setting');
  };

  userFactory.fetchcurrent();
  $scope.user = userFactory.getUser();
  //$http.get("http://jsonplaceholder.typicode.com/posts/").then(function(result){
  //  // console.log(result.data);
  //  $scope.posts = result.data;
  //});





  $scope.showWishlist = false;
  $scope.showListings = true;

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
      time: '6 seconds ago'
    },
    {
      title: 'pop',
      time: '46 seconds ago'
    },
    {
      title: 'hoho',
      time: '2 minutes ago'
    },
    {
      title: 'yolo',
      time: '5 minutes ago'
    }

  ];

  $scope.wishlist = [
    {
      title: 'lol',
      time: '6 seconds ago'
    },
    {
      title: 'pop',
      time: '46 seconds ago'
    },
    {
      title: 'hoho',
      time: '2 minutes ago'
    },
    {
      title: 'yolo',
      time: '5 minutes ago'
    }

  ];

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;
  $scope.noMoreItemsAvailable = false;

  $scope.loadMore = function() {
    $scope.items.push({id: $scope.items.length});
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

  //$scope.shouldShowDelete = false;
  //$scope.shouldShowReorder = false;
  //$scope.listCanSwipe = true
}]);
