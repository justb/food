supplierApp.controller('CategoryIndexCtrl', function ($scope,$state, categoryService) {
                categoryService.getCategories(function (err, data) {
                    if (err) {
                        //do something
                    } else {
                        $scope.categories = data;

                        categoryService.getSuppliers(function (err, data) {
		                    if (err) {
		                        //do something
		                    } else {
		                        $scope.suppliers = data;
		                        console.log($scope.categories);
		                        console.log($scope.suppliers);
		                        for(var x in $scope.categories){
		                        	for(var y in $scope.suppliers){
		                        		if($scope.categories[x].supplier_id==$scope.suppliers[y].id){
		                        			$scope.categories[x].supplier_name=$scope.suppliers[y].name;
		                        		}
		                        	}
		                        }
		                    }
		                });
                    }
                });

                $scope.doQuery = function() {
                    categoryService.findCategories($scope.querykey, function(err, data) {
                        console.log($scope.query);
                        if (err) {
                            console.log(err);
                        } else {
                            $scope.categories = data;
                        }
                    });

                };
                $scope.doDelete = function(id) {
                    categoryService.deleteCategory(id, function(err, data) {
                        if (confirm("确定删除")) {
                            if (err) {

                            } else {
                                alert("success!!");
                                $state.go('categories',{}, {
                                    reload: true
                                });
                            }
                        }
                        else {

                        }
                    });

                };
            });