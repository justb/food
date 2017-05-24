supplierApp.controller('UserIndexCtrl',function ($scope, $state, userService) {

    userService.getUsers(function (err, data) {
        if (err) {
            //do something
        } else {
            $scope.users = data;
        }
    });

    $scope.doQuery = function() {
        userService.findUsers($scope.queryKey, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                $scope.user = data;
            }
        });

    };
    $scope.doDelete = function(id) {
        userService.deleteUser(id, function(err, data) {
            if (confirm("确定删除")) {
                if (err) {

                } else {
                    alert("success!!");
                    $state.go('users',{}, {
                        reload: true
                    });
                }
            }
            else {

            }
        });

    };
}
);
