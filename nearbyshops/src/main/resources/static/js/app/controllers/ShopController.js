app.controller('ShopController',function ($scope, ShopService,$location) {

    $scope.shopName = 'My Shop';
    $scope.shopImage = 'http://placehold.it/150x150';

    ShopService.getAllShops().then(function (value) {
        $scope.allShops = value.data;
    });

});