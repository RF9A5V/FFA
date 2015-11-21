ffe.controller('mainController', ['$scope','$state', '$ionicPopup',function($scope, $state, $ionicPopup) {

    $scope.goProfile = function (){
        $state.go("profile");
    }

}]);