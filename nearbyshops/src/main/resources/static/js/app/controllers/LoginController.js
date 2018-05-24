app.controller('LoginController', function($rootScope, $scope, $http, $route, $location, $cookies, $cookieStore) {

    var authenticate = function(callback) {
      $http.get('user')
      .then(function(response) {
        if (response.data.username) {
            //console.log('USERNAME: '+response.data.username);
            //console.log('USER ID: '+response.data.userId);
            $rootScope.user = response.data;
            $http.defaults.headers.common['X-Auth-Token'] = $rootScope.user.token;
            $cookieStore.put('user',$rootScope.user);
            $rootScope.authenticated = true;
            $cookieStore.put('authenticated',$rootScope.authenticated);
            if ($location.url() == '/login' || $location.path() == '/login') {
                if ($rootScope.redirectUrl != null && $rootScope.redirectUrl != '/login'){
                    $location.url($rootScope.redirectUrl);
                }else{
                    $rootScope.redirectUrl = '/';
                    $location.url('/');
                }
            }
        } else{
            //console.log('INVALID USER: '+response.data.invalidUser);
            $rootScope.authenticated = false;
        }
        callback && callback();
      },function(error) {
        $rootScope.authenticated = false;
        callback && callback();
      });
    }

    authenticate();
    $scope.loginMessage = {};
    $scope.credentials = {};
    $scope.login = function(form) {
        $http.post('login', $.param($scope.credentials), {headers : {"content-type" : "application/x-www-form-urlencoded"}
        }).then(function(response) {
            authenticate(function() {
                if ($rootScope.authenticated == true) {
                    $rootScope.user = $cookieStore.get('user');
                    $http.defaults.headers.common['X-Auth-Token'] = $rootScope.user.token;
                    $cookieStore.put('user',$rootScope.user);
                    $cookieStore.put('authenticated',$rootScope.authenticated);
                } else if ($rootScope.authenticated == false) {
                    $location.path('/login');
                    $scope.error = true;
                }
            });
        },function(error) {
            $scope.loginMessage.loginMessageLabel = error.data;
            form.loginMessageLabel.$error.showMessage = true;
            $scope.loginMessageTxt = error.data;
            $scope.loginMessageTxt = $scope.loginMessageTxt.substring(1,(($scope.loginMessageTxt.length)-1));
            $location.path("/login");
            $scope.error = true;
            $rootScope.authenticated = false;
        })
    };

    $scope.logout = function() {
        $http.post('logout', {})
        .then(function() {
            //console.log("LOGGING-OUT");
            delete $rootScope.user;
            delete $http.defaults.headers.common['X-Auth-Token'];
            $cookieStore.remove('user');
            $cookieStore.remove('authenticated');
            $rootScope.authenticated = false;
            $location.url('/');
        },function(error) {
            $rootScope.authenticated = false;
        });
      }
});