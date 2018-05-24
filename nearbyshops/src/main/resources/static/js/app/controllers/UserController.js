app.controller('NearbyShopsController',function ($scope, UserService) {

    $scope.likeThisShop = function (shopID) {
        UserService.likeShop(shopID).then(function (value) {
            //$scope.likeResponse = value.data;
            for(var i = $scope.nearbyShops.length - 1; i >= 0; i--){
                if($scope.nearbyShops[i].id == shopID){
                    $scope.nearbyShops.splice(i,1);
                }
            }
        });
    }

    $scope.dislikeThisShop = function (shopID) {
        UserService.dislikeShop(shopID).then(function (value) {
            //$scope.dislikeResponse = value.data;
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

app.controller('PreferredShopsController',function ($scope, UserService) {

    $scope.removeThisShop = function (shopID) {
        UserService.removePreferredShop(shopID).then(function (value) {
            $scope.removeResponse = value.data;
            for(var i = $scope.preferredShops.length - 1; i >= 0; i--){
                if($scope.preferredShops[i].id == shopID){
                    $scope.preferredShops.splice(i,1);
                }
            }
        });
    }

    UserService.getPreferredShops().then(function (value) {
        $scope.preferredShops = value.data;
    });

});