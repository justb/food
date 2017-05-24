supplierApp.controller('CategoryEditCtrl', function($scope, $stateParams, categoryService, $state) {
    categoryService.getCategoryById($stateParams.id, function(err, data) {

        if (err) {
            //do something
        } else {
            $scope.category = data[0];
        }
    });
    categoryService.getSuppliers(function (err, data) {
        if (err) {
            //do something
        } else {
            $scope.suppliers = data;
        }
    });
    $scope.doEdit = function() {
        categoryService.editCategory($scope.category.id,$scope.category.name,$scope.suppliers.id.id, function(err, data) {
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
