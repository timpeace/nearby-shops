/*
app.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
            'QRSTUVWXYZabcdef' +
            'ghijklmnopqrstuv' +
            'wxyz0123456789+/' +
            '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
});
*/
app.controller('Navigation', function($rootScope, $scope, $http, $route, $location, $cookies, $cookieStore) {

    var authenticate = function(callback) {
      $http.get('user')
      .then(function(response) {
        if (response.data.valid) {
            console.log('VALID USER: '+response.data.valid);
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
            console.log('INVALID USER: '+response.data.invalid);
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
            $location.path("/login");
            $scope.error = true;
            $rootScope.authenticated = false;
        })
    };

    $scope.logout = function() {
        $http.post('logout', {})
        .then(function() {
            console.log("LOGGING-OUT");
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