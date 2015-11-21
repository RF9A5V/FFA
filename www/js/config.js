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

    var login = {
        url: '/login',
        templateUrl: "templates/login.html",
        controller: "loginController"
    };

    //var tab = {
    //    url: "/tab",
    //    abstract: true,
    //    templateUrl: "templates/tabs.html"
    //};

    var testlisting = {
        url: '/listing',
        templateUrl: 'templates/modals/create_listing.html',
        controller: 'listingController'
    };

    $stateProvider.state('login', login);
    $stateProvider.state('home', home);
    $stateProvider.state('profile', profile);
    $stateProvider.state('testlisting', testlisting);

    $urlRouterProvider.otherwise('/home');

    //$ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
}]);
