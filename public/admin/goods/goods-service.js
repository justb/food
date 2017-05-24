/**
 * Created by lwei on 2016/7/22.
 */
angular.module('good-service',[])
    .factory('goodService',['$http','$rootScope',function ($http,$rootScope) {
        var goods=function (callback) {
            $http({
                method:'get',
                url:'http://localhost:8000/admin/good'
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getGoods = function(callback) {
            return goods(callback);
        };

        var categories=function (callback) {
            $http({
                method:'get',
                url:'http://localhost:8000/admin/category'
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getCategories = function(callback) {
            return categories(callback);
        };

        var findGoods=function (name,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/good/',
                data: {
                    name:name
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getGoodById=function (id,callback) {
            $http({
                method:'get',
                url:'http://localhost:8000/admin/good/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var deleteGoodById=function (id,callback) {
            $http({
                method:'delete',
                url:'http://localhost:8000/good/delete/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var editGood=function (id,name,price,standard,introduction, category_id,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/good/edit/'+id,
                data: {
                    "name": name,
                    "price":price,
                    "standard":standard,
                    "introduction":introduction,
                    "category_id": category_id
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var addGood=function (name,price,standard,introduction, category_id,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/good/add',
                data: {
                    "name": name,
                    "price":price,
                    "standard":standard,
                    "introduction":introduction,
                    "category_id": category_id
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };
        return{
            getGoods:getGoods,
            getCategories:getCategories,
            findGoods:findGoods,
            getGoodById:getGoodById,
            deleteGood:deleteGoodById,
            editGood:editGood,
            addGood:addGood
        }
    }]);
