app.directive('main',function () {
    return {
        restrict:'E',
        template:'<div class="row main {{animDir}}" ng-view></div>',
    }
});