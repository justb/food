supplierApp.controller('SupplierCreateCtrl',function($scope, $stateParams, supplierService, $state) {
    $scope.doAdd = function() {
        supplierService.addSupplier($scope.name,$scope.location,$scope.phone, function(err, data) {
            if (err) {

            } else {
                alert("success!!");
                $state.go('suppliers', $stateParams, {
                    reload: true
                });
            }
        });

    };
});