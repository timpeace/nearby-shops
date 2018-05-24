app.directive('nameAndImageShop',function () {
    return{
        restrict:'E',
        template:'<div class="row align-items-start justify-content-center m-2"><label class="mb-auto shopName">{{shop.name}}</label></div><div class="row align-items-around justify-content-center m-2"><img ng-src="{{shop.picture}}" class="shopImage"></div>'
    }
})