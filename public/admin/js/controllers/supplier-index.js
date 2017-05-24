supplierApp.controller('SupplierIndexCtrl',function ($scope, $state, supplierService) {

    supplierService.getsuppliers(function (err, data) {
        if (err) {
            //do something
        } else {
            $scope.suppliers = data;
        }
    });

    $scope.doQuery = function() {
        supplierService.findSuppliers($scope.queryKey, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                $scope.suppliers = data;
            }
        });

    };
    $scope.doDelete = function(id) {
        supplierService.deleteSupplier(id, function(err, data) {
            if (confirm("确定删除")) {
                if (err) {

                } else {
                    alert("success!!");
                    $state.go('suppliers',{}, {
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