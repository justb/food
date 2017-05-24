/**
 * Created by lwei on 2016/7/22.
 */
var supplierApp = angular.module('suppliers', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'acxm.ui','supplier-service']);

supplierApp.config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $stateProvider
        .state('index', {
            url: "/index",
            templateUrl: 'index/index.html'
        })
        .state('index.detail', {
            url: '/:id',
            templateUrl: 'index/detail.html',
        })
        .state('login', {
            url: '/login',
            templateUrl: 'index/login.html',
        })
        .state('register', {
            url: '/register',
            templateUrl: 'index/register.html',
        })
        .state('order', {
            url: '/order',
            templateUrl: 'index/order.html',
        })
        $urlRouterProvider.otherwise('/index');
});


supplierApp.directive('userInfo',function(){
    return {
        restrict : 'E',
        templateUrl : 'userInfoTemplate.html',
        replace : true,
        transclude : true,
        scope : {
            mytitle : '=etitle'
        },
        link : function(scope,element,attrs){
            scope.showText = false;
            scope.toggleText = function(){
                scope.showText = ! scope.showText;
            }
        }
    };
});

angular.module('suppliers').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
