/**
 * Created by lwei on 2016/7/22.
 */
var supplierApp = angular.module('suppliers', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'acxm.ui','supplier-service']);

supplierApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

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
        console.log(localStorage.getItem('token'));
        
        $httpProvider.interceptors.push('authInterceptor');
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
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            $rootScope.user=localStorage.getItem('user');
    });
    // $httpProvider.defaults.headers.common = { 'access_token' : localStorage.getItem('token') };
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

supplierApp.factory('authInterceptor', function($rootScope){
    return {
        request: function(config){
            config.headers = config.headers || {};
            if(localStorage.getItem('token')){
                config.headers.access_token = localStorage.getItem('token');
            }
            return config;
        },
        responseError: function(response){
            // ...
        }
    };
})

