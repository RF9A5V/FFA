/**
 * Created by Dooshkukakoo on 11/21/2015.
 */
ffe.controller('loginController', ['$scope', '$state', '$http',
    function ($scope, $state, $http) {
        $scope.user ={
            name: '',
            email:'',
            password: '',
            telephone:''
        };

        $scope.backToHome = function () {
            $state.go("home");
        };

        $scope.backToStart = function () {
            $state.go("start");
        };

        $scope.createUser = function () {
            $state.go("create_user");
        };

        $scope.logIn = function () {
            $state.go("login");
        };

        $scope.submit_login = function () {
            //do log-in ajax call here
            console.log("Trying to log in", $scope.user);
        };

        $scope.newUser = function (){
            var data = $.param({
                json: JSON.stringify({
                   name: $scope.user.name ,
                   email: $scope.user.email,
                   password: $scope.user.password,
                   telephone: $scope.user.telephone
               })
            });

            $.ajax({
                url: 'http://localhost:1337/users/create',
                data: {
                    name: $scope.user.name,
                    email: $scope.user.email,
                    password: $scope.user.password,
                    telephone: $scope.user.telephone
                },
                crossDomain: true,
                method: 'POST'
            })

        };

        $scope.smsTest = function () {
            // use $.param jQuery function to serialize data from JSON
            var data = $.param({
                "call": {
                    "no": "14087998066",
                    "caller_id_no": "19492366013"
                },
                "message": "Hello! This is a very happy object"

            });

            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': 'LmQxkLomw8seszAR29n0LcGaOCvp1ibj'
                }
            };

            $http.post('https://api.shoutpoint.com/v0/Dials/SMS', data, config)
                .success(function (data, status, headers, config) {
                    console.log("Success!")
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
