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
            category: "3",
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
            title: "Macbook Pro 2014",
            img: "http://images.apple.com/macbook-air/images/overview_wireless_hero_enhanced.png",
            description: "HDD:256GB SSD/ RAM:8GB/ Retina Display",
            category: "3",
            tags: ["Apple", "Laptop", "Macbook"],
            contact: "Jason Chiu",
            location: "UTC Portal",
            likes: 5
        },
        {
            title: "Macbook Pro 2014",
            img: "http://images.apple.com/macbook-air/images/overview_wireless_hero_enhanced.png",
            description: "HDD:256GB SSD/ RAM:8GB/ Retina Display",
            category: "3",
            tags: ["Apple", "Laptop", "Macbook"],
            contact: "Jason Chiu",
            location: "UTC Portal",
            likes: 5
        },
        {
            title: 'hoho',
            time: '2 minutes ago',
            category: '2',
            description: "I'm giving away nothing. Just posting for fun :P"
        },
        {
            title: 'yolo',
            time: '5 minutes ago',
            category: '1',
            description: 'These descriptions will probably be a lot longer or not...'
        },
        {
            title: 'yolo',
            time: '5 minutes ago',
            category: '1',
            description: 'These descriptions will probably be a lot longer or not...'
        },
        {
            title: 'yolo',
            time: '5 minutes ago',
            category: '1',
            description: 'These descriptions will probably be a lot longer or not...'
        },
        {
            title: 'yolo',
            time: '5 minutes ago',
            category: '3',
            description: 'These descriptions will probably be a lot longer or not...'
        },
        {
            title: 'yolo',
            time: '5 minutes ago',
            category: '3',
            description: 'These descriptions will probably be a lot longer or not...'
        },
        {
            title: 'yolo',
            time: '5 minutes ago',
            category: '2',
            description: 'These descriptions will probably be a lot longer or not...'
        },
        {
            title: 'yolo',
            time: '5 minutes ago',
            category: '2',
            description: 'These descriptions will probably be a lot longer or not...'
        },
        {
            title: 'hello',
            time: '5 minutes ago',
            category: '3',
            description: 'These descriptions will probably be a lot longer or not...'
        }

        ];

        $scope.createListing = function () {
            console.log($scope.item);
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

        $scope.goProfile = function () {
            $state.go("profile");
        };

        $scope.goHome = function () {
            console.log("ASDA");
            $state.go('home');
        };

        var confirmMSG = "Thank you, kind user, for using Free for Everyone! Your item has been publically listed. Once your item has been claimed, please do our family a favor, and indicate that the item has been claimed."

        $scope.sendConfirmationSMS = function(num){
            var data = JSON.stringify({
                "call": {
                    "no": "14087998066",
                    // "no": num, // disabled until we get this working.
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
            })

            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            });
        };
    }]);
        }

        var confirmCreate = function(){
            var confirmPopup = $ionicPopup.confirm({
                title: "Creating",
                template:"Are you sure you want to create this item?"
            });
            confirmPopup.then(function (res) {
                if(res){
                    console.log("Sending request to create item");
                    $.ajax({
                        url: 'http://localhost:1337/items/create',
                        data: {
                            name: "Test Data",
                            description: "asdfasdf",
                            location: "Stridddddng",
                            category: "Strinffffg",
                            is_taken: false,
                        },
                        crossDomain: true,
                        method: 'POST',
                        // success: $scope.sendConfirmationSMS(num)

                    })

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
