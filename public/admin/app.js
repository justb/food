/**
 * Created by lwei on 2016/7/22.
 */
if(sessionStorage.getItem('user_state')==1){
var supplierApp = angular.module('suppliers', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'acxm.ui','supplier-service','category-service','good-service','order-service','user-service']);

supplierApp.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('suppliers', {
                url: "/suppliers",
                templateUrl: '/admin/suppliers/index.html'
            })
            .state('suppliers.edit', {
                url: '/:id',
                templateUrl: '/admin/suppliers/edit.html'
            })
            .state('suppliers.create', {
                url: '/create',
                templateUrl: '/admin/suppliers/create.html'
            })
            .state('categories', {
                url: "/categories",
                templateUrl: '/admin/categories/index.html'
            })
            .state('categories.edit', {
                url: '/:id',
                templateUrl: '/admin/categories/edit.html'
            })
            .state('categories.create', {
                url: 'create',
                templateUrl: '/admin/categories/create.html'
            })
            .state('goods', {
                url: "/goods",
                templateUrl: '/admin/goods/index.html'
            })
            .state('goods.edit', {
                url: '/:id',
                templateUrl: '/admin/goods/edit.html'
            })
            .state('goods.create', {
                url: 'create',
                templateUrl: '/admin/goods/create.html'
            })
            .state('users', {
                url: "/users",
                templateUrl: '/admin/users/index.html'
            })
            .state('users.edit', {
                url: '/:id',
                templateUrl: '/admin/users/edit.html'
            })
            .state('users.create', {
                url: 'create',
                templateUrl: '/admin/users/create.html'
            })
            .state('orders', {
                url: "/orders",
                templateUrl: '/admin/orders/index.html'
            });
        $urlRouterProvider.otherwise('/suppliers');
    /* Add New States Above */

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

}else {
    history.back();
}
