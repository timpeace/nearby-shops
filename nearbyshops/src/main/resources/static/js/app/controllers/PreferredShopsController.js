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