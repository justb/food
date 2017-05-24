supplierApp.controller('GoodCreateCtrl',function($scope, $stateParams, goodService, $state) {
   goodService.getCategories(function (err, data) {
        if (err) {
            //do something
        } else {
            $scope.categories = data;
        }
    });
    $scope.doAdd = function() {
        goodService.addGood($scope.name,$scope.price,$scope.standard,$scope.introduction,$scope.categories.id.id, function(err, data) {
            console.log($scope.name,$scope.price,$scope.standard,$scope.introduction,$scope.categories.id.id);
            if (err) {

            } else {
                alert("success!!");
                $state.go('goods', $stateParams, {
                    reload: true
                });
            }
        });

    };
});