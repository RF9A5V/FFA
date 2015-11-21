ffe.controller('listingController', function($scope,$state) {
  console.log('loaded listing controller');

  $scope.item = {};
  $scope.createListing = function () {
    console.log($scope.item);
  }
});
