supplierApp.controller('GoodIndexCtrl', function ($scope,$state, goodService) {
                goodService.getGoods(function (err, data) {
                    if (err) {
                        //do something
                    } else {
                        $scope.goods = data;

                        goodService.getCategories(function (err, data) {
		                    if (err) {
		                        //do something
		                    } else {
		                        $scope.categories = data;
		                        for(var x in $scope.goods){
		                        	for(var y in $scope.categories){
		                        		if($scope.goods[x].category_id==$scope.categories[y].id){
		                        			$scope.goods[x].category_name=$scope.categories[y].name;
		                        		}
		                        	}
		                        }
		                    }
		                });
                    }
                });

                $scope.doQuery = function() {
                    goodService.findGoods($scope.querykey, function(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            $scope.goods = data;
                        }
                    });

                };
                $scope.doDelete = function(id) {
                    goodService.deleteGood(id, function(err, data) {
                        if (confirm("确定删除")) {
                            if (err) {

                            } else {
                                alert("success!!");
                                $state.go('goods',{}, {
                                    reload: true
                                });
                            }
                        }
                        else {

                        }
                    });

                };
            });