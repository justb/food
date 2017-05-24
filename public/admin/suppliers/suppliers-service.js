/**
 * Created by lwei on 2016/7/22.
 */
angular.module('supplier-service',[])
    .factory('supplierService',['$http','$rootScope',function ($http,$rootScope) {
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

        var findSuppliers=function (name,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/supplier/',
                data: {
                    name:name
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getSupplierById=function (id,callback) {
            $http({
                method:'get',
                url:'http://localhost:8000/admin/supplier/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var deleteSupplierById=function (id,callback) {
            $http({
                method:'delete',
                url:'http://localhost:8000/admin/supplier/delete/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var editSupplier=function (supplier,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/supplier/edit/'+supplier.id,
                data: {
                    "name": supplier.name,
                    "location": supplier.location,
                    "phone": supplier.phone
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var addSupplier=function (name,location,phone,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/supplier/add',
                data: {
                    "name": name,
                    "location": location,
                    "phone": phone
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };
        return{
            getsuppliers:getSuppliers,
            findSuppliers:findSuppliers,
            getSupplierById:getSupplierById,
            deleteSupplier:deleteSupplierById,
            editSupplier:editSupplier,
            addSupplier:addSupplier
        }
    }]);
