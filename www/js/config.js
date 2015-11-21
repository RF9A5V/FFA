ffe.config(['$stateProvider','$urlRouterProvider','$urlMatcherFactoryProvider','$ionicConfigProvider', function( $stateProvider,$urlRouterProvider, $urlMatcherFactoryProvider, $ionicConfigProvider){

  var home = {
    url: '/home',
    templateUrl: "templates/main.html",
    controller: "mainController"
  };

  var profile = {
    url: '/profile',
    templateUrl: "templates/profile.html",
    controller: "profileController"
  };

  var login = {
    url:'/login',
    templateUrl:"templates/login.html",
    controller:"loginController"
  };

  var tab = {
    url:"/tab",
    abstract:true,
    templateUrl:"templates/tabs.html"
  };

  var food_tab = {
    url:"/food",
    views:{
      'food-tab':{
        templateUrl: "templates/food.html",
        controller:'foodController'
      }
    }
  };

  var furniture_tab = {
    url:'/furniture',
    views:{
      'furniture-tab':{
        templateUrl:"templates/furniture.html",
        controller:"furnitureController"
      }
    }
  };

  var electronics_tab = {
    url:'/electronics',
    views:{
      'electronics-tab':{
        templateUrl:"templates/electronics.html",
        controller:"electronicsController"
      }
    }
  };

  var testlisting = {
    url: '/listing',
    templateUrl: 'templates/modals/create_listing.html',
    controller: 'listingController'
  };


  $stateProvider.state('login', login);
  $stateProvider.state('home', home);
  $stateProvider.state('profile', profile);
  $stateProvider.state('testlisting', testlisting);

  $stateProvider.state('tabs', tab);
  $stateProvider.state('tabs.food',food_tab);
  $stateProvider.state('tabs.furniture',furniture_tab);
  $stateProvider.state('tabs.electronics', electronics_tab);

  //$urlRouterProvider.otherwise('/home');

  //$ionicConfigProvider.tabs.position('top');
  //$ionicConfigProvider.navBar.alignTitle('center');


}]);
