app.directive('infoShop',function () {
    return{
        restrict:'E',
        template:'<span class="tooltiptext"><i class="material-icons" style="font-size:11px;margin-left: 2px;">place</i> {{shop.city}}<br/><i class="material-icons" style="font-size:11px;margin-left: 2px;">email</i> {{shop.email}}</span>'
    }
})