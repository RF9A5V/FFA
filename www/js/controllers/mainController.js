ffe.controller('mainController', ['$scope','$state', '$ionicPopup',function($scope, $state, $ionicPopup) {

    $scope.goProfile = function (){
        $state.go("profile");
    }

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

}]);