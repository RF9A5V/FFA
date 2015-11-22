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
