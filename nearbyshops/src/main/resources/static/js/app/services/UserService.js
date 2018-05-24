app.factory('UserService',function ($rootScope,$http) {
    var service = {};

    service.getNearbyShops = function (){
        return $http({
            url: 'http://localhost:8080/api/v1/secured/nearby-shops',
            method: 'GET',
            params: {
                userId: $rootScope.user.userId
            }
        });
    }

    service.getPreferredShops = function (){
        return $http({
            url: 'http://localhost:8080/api/v1/secured/preferred-shops',
            method: 'GET',
            params: {
                userId: $rootScope.user.userId
            }
            
        });
    }

    service.likeShop = function (shopID){
        return $http({
            headers: {'Content-Type':'application/json'},
            url: 'http://localhost:8080/api/v1/secured/like-shop',
            method: 'POST',
            data: {
              "userId": $rootScope.user.userId,
              "shopId": shopID
            }
        });
    }

    service.dislikeShop = function (shopID){
        return $http({
            headers: {'Content-Type':'application/json'},
            url: 'http://localhost:8080/api/v1/secured/dislike-shop',
            method: 'POST',
            data: {
              "userId": $rootScope.user.userId,
              "shopId": shopID
            }
        });
    }


    service.removePreferredShop = function (shopID){
        return $http({
            headers: {'Content-Type':'text/plain'},
            url: 'http://localhost:8080/api/v1/secured/remove-shop',
            method: 'DELETE',
            params: {
                "shopId": shopID,
                "userId": $rootScope.user.userId
            }
        });
    }

    service.addNewUser = function (username,password) {
        return $http({
            headers: {'Content-Type':'application/json'},
            url: 'http://localhost:8080/api/v1/signup',
            method: 'POST',
            data: {
              "username": username,
              "password": password
            }
        });
    }

    return service;
});