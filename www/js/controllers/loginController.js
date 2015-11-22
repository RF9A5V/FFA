ffe.controller('loginController', ['$scope', '$state', '$http', 'userFactory',
    function ($scope, $state, $http, userFactory) {
        $scope.user = {
            name: '',
            email: '',
            password: '',
            telephone: ''
        };

        var saveAfterSuccessLogin = function (res) {
            console.log("Response after login: ", res);
            // Sets the user values after success login
            userFactory.setUser(res);
            $state.go("home");
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


        $scope.newUser = function () {
            console.log($scope.user.name);

            $.ajax({
                url: 'http://ffe-api-reboot.mybluemix.net/users/create',
                data: {
                    name: $scope.user.name,
                    email: $scope.user.email,
                    password: $scope.user.password,
                    telephone: $scope.user.telephone
                },
                crossDomain: true,
                method: 'POST',
                xhrFields: {
                    withCredentials: true
                }
            });
            $.ajax({
                url: 'http://ffe-api-reboot.mybluemix.net/login',
                data: {
                    email: $scope.user.email,
                    password: $scope.user.password,
                },
                crossDomain: true,
                method: 'POST',
                success: function (res) {
                    console.log("Resp after login", res);
                    saveAfterSuccessLogin(res);
                    $state.go("home");
                },
                xhrFields: {
                    withCredentials: true
                }
            });

        };

        $scope.submit_login = function () {
            //do log-in ajax call here
            console.log("Trying to log in", $scope.user);
            console.log("User:" + $scope.user.email);

            $.ajax({
                url: 'http://ffe-api-reboot.mybluemix.net/login',
                data: {
                    email: $scope.user.email,
                    password: $scope.user.password,
                },
                crossDomain: true,
                method: 'POST',
                success: function (res) {
                    console.log("Resp after login", res);
                    saveAfterSuccessLogin(res);
                },
                xhrFields: {
                    withCredentials: true
                }
            })

        };


        /* Example SMS Test */
        $scope.smsTest = function () {

            // use $.param jQuery function to serialize data from JSON
            var data = JSON.stringify({
                "call": {
                    "no": "14083553211", // One of our test numbers
                    // "no": "17149445640",
                    // "no": "14087998066",
                    "caller_id_no": "19492366013"
                },
                "message": "Hello Jason! This is a very happy message from...shoutpoint!"
            });

            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': 'LmQxkLomw8seszAR29n0LcGaOCvp1ibj'
                }
            };

            $http.post('https://api.shoutpoint.com/CORS/v0/Dials/SMS', data, config)
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