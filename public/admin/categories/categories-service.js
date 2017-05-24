/**
 * Created by lwei on 2016/7/22.
 */
angular.module('category-service',[])
    .factory('categoryService',['$http','$rootScope',function ($http,$rootScope) {
        var categorys=function (callback) {
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
            return categorys(callback);
        };

        var suppliers=function (callback) {
            $http({
                method:'get',
                url:'http://localhost:8000/admin/supplier'
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getSuppliers = function(callback) {
            return suppliers(callback);
        };

        var findCategories=function (name,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/category/',
                data: {
                    name:name
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getCategoryById=function (id,callback) {
            $http({
                method:'get',
                url:'http://localhost:8000/admin/category/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var deleteCategoryById=function (id,callback) {
            $http({
                method:'delete',
                url:'http://localhost:8000/admin/category/delete/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var editCategory=function (id,name,supplier_id,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/category/edit/'+id,
                data: {
                    "name": name,
                    "supplier_id": supplier_id
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var addCategory=function (name,supplier_id,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/category/add',
                data: {
                    "name": name,
                    "supplier_id": supplier_id
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };
        return{
            getCategories:getCategories,
            getSuppliers:getSuppliers,
            findCategories:findCategories,
            getCategoryById:getCategoryById,
            deleteCategory:deleteCategoryById,
            editCategory:editCategory,
            addCategory:addCategory
        }
    }]);
