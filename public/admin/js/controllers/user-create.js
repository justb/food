supplierApp.controller('UserCreateCtrl',function($scope, $stateParams, userService, $state) {
    $scope.doAdd = function() {
        userService.addUser($scope.name,$scope.sex,$scope.age,$scope.location,$scope.phone,$scope.password, function(err, data) {
            if (err) {

            } else {
                alert("success!!");
                $state.go('users', $stateParams, {
                    reload: true
                });
            }
        });

    };
});
