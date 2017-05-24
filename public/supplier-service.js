angular.module('supplier-service',[])
    .factory('supplierService',['$http','$rootScope',function ($http,$rootScope) {
        var suppliers=function (callback) {
            $http({
                method:'get',
                url:'http://120.24.239.232:8000/admin/supplier'
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getSuppliers = function(callback) {
            return suppliers(callback);
        };

        var categories=function (id,callback) {
            $http({
                method:'get',
                url:'http://120.24.239.232:8000/index/detail/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getCategories = function(id,callback) {
            return categories(id,callback);
        };

        var getGoodsByCategroy=function (category_id,callback) {
            $http({
                method:'post',
                url:'http://120.24.239.232:8000/index/detail',
                data: {

                    "category_id": category_id
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

         var loadGoods=function (callback) {
            $http({
                method:'get',
                url:'http://120.24.239.232:8000/index/detail',
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getNameById=function (supplier_id,callback) {
            $http({
                method:'post',
                url:'http://120.24.239.232:8000/index/detail/get',
                data: {

                    "supplier_id": supplier_id
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };
        var getOrderByUserId=function (user_id,callback) {
            $http({
                method:'get',
                url:'http://120.24.239.232:8000/index/order/'+user_id,

            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var cancelOrderById=function (id,callback) {
            $http({
                method:'delete',
                url:'http://120.24.239.232:8000/index/order/cancel/'+id,

            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var userLogin=function (phone,password,callback) {
            $http({
                method:'post',
                url:'http://120.24.239.232:8000/index/login',
                data: {

                    "phone": phone,
                    "password":password
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var userRegister=function (user,callback) {
            $http({
                method:'post',
                url:'http://120.24.239.232:8000/index/register',
                data: {
                    "name":user.name,
                    "sex":user.sex,
                    "age":user.age,
                    "location":user.location,
                    "phone": user.phone,
                    "password":user.password
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var orderSubmit2=function (order,totalprice,createdate,callback) {
            $http({
                method:'post',
                url:'http://120.24.239.232:8000/index/order/insert',
                data: {
                    order:order,
                    'totalprice':totalprice,
                    'createdate':createdate
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };
        var orderSubmit=function (user_id, user_name, supplier_id,supplier_name, good_id,good_name, good_num,good_price, totalprice,createdate,callback) {
            $http({
                method:'post',
                url:'http://120.24.239.232:8000/index/order/add',
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
            loadGoods:loadGoods,
            getSuppliers:getSuppliers,
            getCategories:getCategories,
            getGoodsByCategroy:getGoodsByCategroy,
            getNameById:getNameById,
            getOrderByUserId:getOrderByUserId,
            cancelOrderById:cancelOrderById,
            userLogin:userLogin,
            userRegister:userRegister,
            orderSubmit:orderSubmit,
            orderSubmit2:orderSubmit2
        };
        }]);
