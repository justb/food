supplierApp.controller('registerCtrl',function ($scope,$rootScope, $state, supplierService) {
    $rootScope.user=sessionStorage.getItem('user_name');
    $rootScope.state=sessionStorage.getItem('user_state');
    $scope.doRegister = function() {
        supplierService.userRegister($scope.user, function(err, data) {
            if (err) {

            } else {
                // console.log(data);
                // sessionStorage.setItem('user_id',data[0].id);
                // sessionStorage.setItem('user_name',data[0].name);
                // sessionStorage.setItem('user_state',data[0].state);
                // $rootScope.user=sessionStorage.getItem('user_name');
                // $rootScope.state=sessionStorage.getItem('user_state');
                alert("success!!");
                $state.go('index', null, {
                    reload: true
                });
            }
        });

    };
});
