supplierApp.controller('GoodEditCtrl', function($scope, $stateParams, goodService, $state) {
    goodService.getGoodById($stateParams.id, function(err, data) {

        if (err) {
            //do something
        } else {
            $scope.good = data[0];
        }
    });
    goodService.getCategories(function (err, data) {
        if (err) {
            //do something
        } else {
            $scope.categories = data;
        }
    });
    $scope.doEdit = function() {
        goodService.editGood($scope.good.id,$scope.good.name,$scope.good.price,$scope.good.standard,$scope.good.introduction,$scope.categories.id.id, function(err, data) {
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
