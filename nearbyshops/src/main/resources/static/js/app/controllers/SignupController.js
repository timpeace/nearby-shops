app.controller('SignupController', function($scope, UserService, $location,$timeout) {

    $scope.isSignedup = false;
    $scope.isExist = false;
    $scope.signupMessage = '';
    $scope.signup = {};

    $scope.addNewUser = function () {
        UserService.addNewUser($scope.signup.username,$scope.signup.password).then(function (response) {
            console.log(response);
            if(response.data.valid){
                $scope.isSignedup = true;
                $scope.signupMessage = response.data.valid;
                $timeout(function() { 
                    $location.path('/login');
                }, 3000);
            }else if(response.data.alreadyExist){
                $scope.isExist = true;
                $scope.signupMessage = response.data.alreadyExist;
                $timeout(function() { 
                    $scope.isExist = false;
                }, 2000);
            }
            else if(response.data.invalid){
                $scope.isExist = true;
                $scope.signupMessage = response.data.invalid;
                $timeout(function() { 
                    $scope.isExist = false;
                }, 2000);
            }
        });
    }

});