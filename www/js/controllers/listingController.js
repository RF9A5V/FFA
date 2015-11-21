ffe.controller('listingController', function($scope,$state) {
  console.log('loaded listing controller');

  $scope.selected_item = {
    title: "Macbook Pro 2014",
    img: "http://images.apple.com/macbook-air/images/overview_wireless_hero_enhanced.png",
    description: "HDD:256GB SSD/ RAM:8GB/ Retina Display",
    category: "Electronic",
    tags: ["Apple", "Laptop", "Macbook"],
    contact: "Jason Chiu",
    location: "UTC Portal",
    likes: 5
  };

  $scope.item = {
    title: "",
    img: "",
    description: "",
    category: "",
    tags: [],
    contact: "",
    location: "",
    likes: ""
  };

  $scope.createListing = function () {
    console.log($scope.item);
  }
});
