/**
 * Created by lwei on 2016/7/22.
 */
angular.module('order-service',[])
    .factory('orderService',['$http','$rootScope',function ($http,$rootScope) {
        var orders=function (pagenum,pagesize,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/order/s/',
                data:{
                    pagenum:pagenum,
                    pagesize:pagesize
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getOrders = function(pagenum,pagesize,callback) {
            return orders(pagenum,pagesize,callback);
        };

        var getCounts=function(callback){
            $http({
                method:'get',
                url:'http://localhost:8000/admin/order/'
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var findOrders=function (name,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/order/',
                data: {
                    name:name
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getOrderById=function (id,callback) {
            $http({
                method:'get',
                url:'http://localhost:8000/admin/order/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var deleteOrderById=function (id,callback) {
            $http({
                method:'delete',
                url:'http://localhost:8000/admin/order/delete/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };
        var approvalOrderById=function (id,callback) {
            $http({
                method:'get',
                url:'http://localhost:8000/admin/order/approval/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };
        var rejectOrderById=function (id,callback) {
            $http({
                method:'get',
                url:'http://localhost:8000/admin/order/reject/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var editOrder=function (order,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/order/edit/'+order.id,
                data: {
                    'user_id':order.user_id,
                    'user_name':order.user_name,
                    'supplier_id':order.supplier_id,
                    'supplier_name':order.supplier_name,
                    'good_id':order.good_id,
                    'good_name':order.good_name,
                    'good_num':order.good_num,
                    'good_price':order.good_price,
                    'totalprice':order.totalprice,
                    'createdate':order.createdate
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var addOrder=function (user_id, user_name, supplier_id,supplier_name, good_id,good_name, good_num,good_price, totalprice,createdate,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/order/add',
                data: {
                    'user_id':user_id,
                    'user_name':user_name,
                    'supplier_id':supplier_id,
                    'supplier_name':supplier_name,
                    'good_id':good_id,
                    "good_name":good_name,
                    'good_num':good_num,
                    'good_price':good_price,
                    'totalprice':totalprice,
                    'createdate':createdate
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };
        return{
            getorders:getOrders,
            getCounts:getCounts,
            findOrders:findOrders,
            getOrderById:getOrderById,
            deleteOrder:deleteOrderById,
            editOrder:editOrder,
            addOrder:addOrder,
            approvalOrderById:approvalOrderById,
            rejectOrderById:rejectOrderById
        }
    }]);
