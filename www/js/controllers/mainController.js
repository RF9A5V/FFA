ffe.controller('mainController', ['$scope', '$state', '$ionicPopup', '$ionicModal',
    function ($scope, $state, $ionicPopup, $ionicModal) {

        $scope.showListings = true;

        $scope.show_listings = function (){
            $scope.showListings = true;
            $scope.showWishlist = false;
        };

        $scope.show_wishlist = function () {
            $scope.showListings = false;
            $scope.showWishlist = true;
        };

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
            },
            {
                title: 'yolo',
                time: '5 minutes ago',
                description: 'These descriptions will probably be a lot longer or not...'
            },
            {
                title: 'yolo',
                time: '5 minutes ago',
                description: 'These descriptions will probably be a lot longer or not...'
            },
            {
                title: 'yolo',
                time: '5 minutes ago',
                description: 'These descriptions will probably be a lot longer or not...'
            },
            {
                title: 'yolo',
                time: '5 minutes ago',
                description: 'These descriptions will probably be a lot longer or not...'
            },
            {
                title: 'yolo',
                time: '5 minutes ago',
                description: 'These descriptions will probably be a lot longer or not...'
            },
            {
                title: 'yolo',
                time: '5 minutes ago',
                description: 'These descriptions will probably be a lot longer or not...'
            },
            {
                title: 'hello',
                time: '5 minutes ago',
                description: 'These descriptions will probably be a lot longer or not...'
            }

        ];

        $scope.createListing = function () {
            console.log($scope.item);
            //TODO: save the data here
            confirmCreate();
        };

        $ionicModal.fromTemplateUrl('templates/modals/create_listing.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.create_listing_modal = modal;
        });

        $scope.goProfile = function () {
            $state.go("profile");
        };

        $scope.goHome = function () {
            console.log("ASDA");
            $state.go('home');
        };

        var confirmCreate = function(){
            var confirmPopup = $ionicPopup.confirm({
                title: "Creating",
                template:"Are you sure you want to create this item?"
            });
            confirmPopup.then(function (res) {
                if(res){
                    $scope.create_listing_modal.hide();
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
                } else {
                    console.log("no action taken");
                }
            });
        };

    }]);
