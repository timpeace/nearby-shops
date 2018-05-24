app.controller('NearbyShopsController',function ($scope, UserService) {

    $scope.likeThisShop = function (shopID) {
        UserService.likeShop(shopID).then(function (value) {
            for(var i = $scope.nearbyShops.length - 1; i >= 0; i--){
                if($scope.nearbyShops[i].id == shopID){
                    $scope.nearbyShops.splice(i,1);
                }
            }
        });
    }

    $scope.dislikeThisShop = function (shopID) {
        UserService.dislikeShop(shopID).then(function (value) {
            for(var i = $scope.nearbyShops.length - 1; i >= 0; i--){
                if($scope.nearbyShops[i].id == shopID){
                    $scope.nearbyShops.splice(i,1);
                }
            }
        });
    }

    UserService.getNearbyShops().then(function (value) {
        $scope.nearbyShops = value.data;
    });


});
