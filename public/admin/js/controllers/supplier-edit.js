supplierApp.controller('SupplierEditCtrl', function($scope, $stateParams, supplierService, $state) {
    supplierService.getSupplierById($stateParams.id, function(err, data) {

        if (err) {
            //do something
        } else {
            $scope.supplier = data[0];
        }
    });
    $scope.doEdit = function() {
        supplierService.editSupplier($scope.supplier, function(err, data) {
            console.log($scope.supplier);
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