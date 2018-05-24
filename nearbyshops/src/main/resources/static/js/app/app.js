var app = angular.module('myApp',['ngRoute','ngCookies','ngMessages','ngAnimate']);

app.config(function ($routeProvider,$locationProvider) {
   $routeProvider
   .when('/',{
    templateUrl:'/views/shop-all.html',
    controller:'AllShopsController'
    })
   .when('/login',{
        templateUrl:'/views/login.html',
        controller:'LoginController'
   })
   .when('/signup',{
    templateUrl:'/views/signup.html',
    controller:'SignupController'
    })
   .when('/all-shops',{
    templateUrl:'/views/shop-all.html',
    controller:'AllShopsController'
    })
   .when('/nearby-shops',{
        templateUrl:'/views/shop-nearby.html',
        controller:'NearbyShopsController'
   })
   .when('/preferred-shops',{
        templateUrl:'/views/shop-preferred.html',
        controller:'PreferredShopsController'
   })
   .otherwise({
        redirectTo:'/'
   });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });
})
.controller('siteController', ['$scope', '$route', '$routeParams', '$location',
function ($scope, $route, $routeParams, $location) {
    $scope.animDir = '';
    $scope.$on('$routeChangeStart', function (angularEvent, next, current) {
        if (current) {
            var x = 0;
            var currentIndex = 0;
            var nextIndex = 0;
            angular.forEach($route.routes, function (value, key) {
                x++;
                //find current node
                if (key == current.$$route.originalPath) {
                    currentIndex = x;
                }

                //find next node
                if (key == next.$$route.originalPath) {
                    nextIndex = x;
                }
            });

            if(nextIndex < currentIndex){
                $scope.animDir = 'left';
            }
            if(nextIndex > currentIndex){
                $scope.animDir = 'loginForm';
            }
        }
    });
}])
.run(function($rootScope, $http, $location, $cookieStore) {
    $rootScope.animDir = '';
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if($location.path() == '/login'){
            // animate login form
            $rootScope.animDir = 'bottom2top';
            $("nav a").css("cssText", "text-decoration: none !important;");
            $("#menuLogin").css("cssText", "text-decoration: underline !important;");
        }else if($location.path() == '/signup'){
            // animate signup form
            $rootScope.animDir = 'top2bottom';
            $("nav a").css("cssText", "text-decoration: none !important;");
            $("#menuSignup").css("cssText", "text-decoration: underline !important;");
        }else{
            $rootScope.animDir = '';
        }
        var originalPath = $location.url();
        var user = $cookieStore.get('user');
        if ($rootScope.authenticated == false) {
            if ($location.path() == '/all-shops' || $location.path() == '/') {
                $location.path('/all-shops');
            }else if($location.path() == '/login'){
                $location.path('/login');
            }else if($location.path() == '/signup'){
                $location.path('/signup');
            }else{
                $location.path('/login');
            }
        }else if($rootScope.authenticated == true) {
            $rootScope.redirectUrl = angular.copy($location.url());
            user = $cookieStore.get('user');
            if (user !== undefined) {
                $rootScope.user = user;
                $http.defaults.headers.common['X-Auth-Token'] = user.token;
                if (originalPath == '/login' || $rootScope.redirectUrl == '/login') {
                    $location.path('/');
                }
            }
        }
    })
});