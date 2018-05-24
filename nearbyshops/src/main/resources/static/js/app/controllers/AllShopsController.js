app.controller('AllShopsController',function ($scope, ShopService,$location) {

    ShopService.getAllShops().then(function (value) {
        $scope.allShops = value.data;
    });

});