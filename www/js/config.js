ffe.config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $ionicConfigProvider) {

        var home = {
            url: '/home',
            //abstract: true,
            templateUrl: "templates/main.html",
            controller: "mainController"
        };

        var profile = {
            url: '/profile',
            templateUrl: "templates/profile.html",
            controller: "profileController"
        };

        var start = {
            url: '/start',
            templateUrl: "templates/start.html",
            controller: "loginController"
        };

        var login = {
            url: '/login',
            templateUrl: "templates/login.html",
            controller: "loginController"
        };

         var create_user = {
            url: '/create_user',
            templateUrl: "templates/create_user.html",
            controller: "loginController"
        };

        var verification = {
            url: '/verification',
            templateUrl: "templates/verification.html",
            controller: "loginController"
        };

        //var testlisting = {
        //    url: '/listing',
        //    templateUrl: 'templates/modals/create_listing.html',
        //    controller: 'listingController'
        //};

        $stateProvider.state('start', start);
        $stateProvider.state('login', login);
        $stateProvider.state('home', home);
        $stateProvider.state('profile', profile);
        $stateProvider.state('create_user', create_user);
        $stateProvider.state('verification', verification);

        $urlRouterProvider.otherwise('/start');

        //$ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.navBar.alignTitle('center');
    }]);

ffe.run(['$state', '$rootScope', function ($state, $rootScope) {
    $rootScope.$on("$stateChangeStart", function (event, toState, current) {
        //if there isn't a user logged in to Parse, and if the state they're going to is login pages, let them go to login.
        $.ajax({
            url: "http://localhost:1337/users/validate",
            success: function(data, text, jq){
                console.log("WTFFFFFFFFFF",data.uid);
                if(data.uid == undefined){
                    if (toState.name === 'login' || toState.name === 'create_user' || toState.name === 'start') {
                    } else {
                        event.preventDefault();
                        $state.go('login');
                        console.log("not logged in")
                    }
                }else {
                    //if there is a user logged in, don't allow user to go to login pages. Redirect to home page.
                    if (toState.name === 'login' || toState.name === 'create_user' || toState.name === 'start') {
                        event.preventDefault();
                        $state.go('home');
                        console.log("logged in")
                    }
                }
            },
            crossDomain: true,
            method: 'GET',
            xhrFields: {
                withCredentials: true
            }
        });

    });
}]);