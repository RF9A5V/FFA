/**
 * Created by Dooshkukakoo on 11/21/2015.
 */
ffe.controller('loginController', ['$scope','$state',
	function($scope, $state) {


	$scope.backToHome = function() {
    	$state.go("home");
  	};


}]);