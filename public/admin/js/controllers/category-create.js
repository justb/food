supplierApp.controller('CategoryCreateCtrl',function($scope, $stateParams, categoryService, $state) {
   categoryService.getSuppliers(function (err, data) {
        if (err) {
            //do something
        } else {
            $scope.suppliers = data;
        }
    });
    $scope.doAdd = function() {
        categoryService.addCategory($scope.name,$scope.suppliers.id.id, function(err, data) {
            if (err) {

            } else {
                alert("success!!");
                $state.go('categories', $stateParams, {
                    reload: true
                });
            }
        });

    };
});