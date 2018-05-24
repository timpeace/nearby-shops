app.factory('ShopService',["$http",function ($http) {
    var service = {};

    service.getAllShops = function (){
        return $http.get('http://localhost:8080/api/v1/shops');
    }

    return service;
}]);