supplierApp.controller('loginCtrl',function ($scope,$rootScope, $stateParams,$state, supplierService) {

$scope.doLogin = function() {
        supplierService.userLogin($scope.phone,$scope.password, function(err, data) {
            if (err) {

            } else {
                console.log(data);
                if(data.length!=0){
                    sessionStorage.setItem('user_id',data[0].id);
                    sessionStorage.setItem('user_name',data[0].name);
                    sessionStorage.setItem('user_state',data[0].state);
                    $rootScope.user=sessionStorage.getItem('user_name');
                    $rootScope.state=sessionStorage.getItem('user_state');
                    history.back();
                    // console.log($rootScope.user);
                }


            }
        });

    };
});
