supplierApp.controller('UserEditCtrl', function($scope, $stateParams, userService, $state) {
    userService.getUserById($stateParams.id, function(err, data) {

        if (err) {
            //do something
        } else {
            $scope.user = data[0];
        }
    });
    $scope.doEdit = function() {
        userService.editUser($scope.user, function(err, data) {
            console.log($scope.user);
            if (err) {

            } else {
                alert("success!!");
                $state.go('^', $stateParams, {
                    reload: true
                });
            }
        });

    };
});
