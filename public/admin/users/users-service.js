/**
 * Created by lwei on 2016/7/22.
 */
angular.module('user-service',[])
    .factory('userService',['$http','$rootScope',function ($http,$rootScope) {
        var users=function (callback) {
            $http({
                method:'get',
                url:'http://localhost:8000/admin/user'
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getUsers = function(callback) {
            return users(callback);
        };

        var findUsers=function (name,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/user/',
                data: {
                    name:name
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var getUserById=function (id,callback) {
            $http({
                method:'get',
                url:'http://localhost:8000/admin/user/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var deleteUserById=function (id,callback) {
            $http({
                method:'delete',
                url:'http://localhost:8000/admin/user/delete/'+id
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var editUser=function (user,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/user/edit/'+user.id,
                data: {
                    "name": user.name,
                    "sex": user.sex,
                    "age": user.age,
                    "location": user.location,
                    "phone": user.phone,
                    "password": user.password
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };

        var addUser=function (name,sex,age,location,phone,password,callback) {
            $http({
                method:'post',
                url:'http://localhost:8000/admin/user/add',
                data: {
                    "name": name,
                    "sex": sex,
                    "age": age,
                    "location": location,
                    "phone": phone,
                    "password": password
                }
            }).success(function (data) {
                return callback(null,data);
            }).error(function (data) {
                return callback(data);
            })
        };
        return{
            getUsers:getUsers,
            findUsers:findUsers,
            getUserById:getUserById,
            deleteUser:deleteUserById,
            editUser:editUser,
            addUser:addUser
        }
    }]);
