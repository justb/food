supplierApp.controller('detailCtrl',function ($scope,$rootScope, $stateParams, $state, supplierService) {
    $rootScope.user=sessionStorage.getItem('user_name');
    $rootScope.state=sessionStorage.getItem('user_state');
    $scope.category_id1=0;
    $scope.category_id2=0;

    supplierService.getCategories($stateParams.id,function (err, data) {
        if (err) {
            //do something
        } else {
            $scope.categories = data;
            //console.log($scope.categories);
            $scope.goods=[];
            for(var k=0;k<$scope.categories.length;k++){
                //这里再根据获取到的分类 获取商品信息
                supplierService.getGoodsByCategroy($scope.categories[k].id,function (err,data) {
                        if (err) {
                            //do something
                        } else {
                            for(var i=0;i<data.length;i++){
                                if(data[i].standard!=null){
                                    //$scope.goods[k][i].standard=data[i].standard;
                                }
                            }
                            $scope.goods.push(data);
                        }
                    }
                )
            }
        }
    });
    $scope.move = function(id) {
        // if ($state.current.name === "index") {
            if ($("#" + id).length > 0)
                $("html,body").animate({
                    scrollTop : $("#" + id).offset().top
                }, 1000);
        // } else {
        //     $state.go("index", {index: 'index'}).then(function() {
        //         setTimeout(function(){
        //             if ($("#" + id).length > 0)
        //                 $("html,body").animate({
        //                     scrollTop : $("#" + id).offset().top
        //                 }, 1000);
        //         }, 500);
        //     });
        // }
    };
    $scope.select=function(id,name,price,standard){
        var standards=standard.split(" ");
        $scope.standards = [];
        for (var i=0;i<standards.length;i++)
        {
             $scope.standards.push(standards[i]);
        }
        console.log($scope.standards);
        $scope.selectgoods={id,name,price}
        $('#select_Modal').modal('show');
    };
    $scope.totalprice=0;
    $scope.order=[];
    if($rootScope.order==null){
        $scope.order=[];
    }else {

        $scope.order=$rootScope.order;
        $scope.totalprice=$rootScope.totalprice;
        console.log($rootScope.totalprice);
    }

	var flag=0;
    var good_id="",good_name="",good_num="",good_price="",totalprice=0;
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "HH+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    var time = new Date().Format("yyyy-MM-dd HH:mm:ss");

    $scope.addtocart = function(id,name,price,standard) {
        if(standard!=null){
            name=name+"-"+standard;
        }
    	if($scope.order.length==0){
    		$scope.order.push({'id':id,'name':name,'price':price,'number':1,'totalprice':price});
            $scope.totalprice+=parseInt($scope.order[$scope.order.length-1].price);
    	}
    	else{
    		for(var k in $scope.order){
	    		if(id==$scope.order[k].id&&name==$scope.order[k].name){
	    			$scope.order[k].number++;
	    			$scope.order[k].totalprice=$scope.order[k].number*$scope.order[k].price;
                    $scope.totalprice+=parseInt($scope.order[k].price);
	    			flag=1;
	    		}
			}
			if(flag==0){
				$scope.order.push({'id':id,'name':name,'price':price,'number':1,'totalprice':price});
                $scope.totalprice+=parseInt($scope.order[$scope.order.length-1].price);
			}
			else{
				flag=0;
			}

    	}

    };
    $scope.minus=function (o) {
            if(o.number>1) {
                o.number--;
                o.totalprice = o.number * o.price;

            }else {
                var j=0;
                for(var i=0;i<$scope.order.length;i++) {
                    if ($scope.order[i] == o) {
                        j = i;
                        break;
                    }
                }
                $scope.order.splice(j,1);
            }
            $scope.totalprice -= o.price;

    };
    $scope.plus=function (o) {
        o.number++;
        o.totalprice=o.number*o.price;
        $scope.totalprice+=o.price;
    };
    $scope.submitorder=function(){
        if($scope.order.length>0){
            if(sessionStorage.getItem('user_id')!=undefined){
                angular.forEach($scope.order,function (data) {
                    good_id+=data.id+" ";
                    good_name+=data.name+" ";
                    good_num+=data.number+" ";
                    good_price+=data.price+" ";
                    totalprice+=data.totalprice;
                });
                //console.log(123);
                // console.log($scope.order);
                // console.log(sessionStorage.getItem('user_name'));
                // console.log(sessionStorage.getItem('user_id'));
                // console.log(new Date());
                // console.log(good_id,good_name,good_num,good_price,totalprice);
                supplierService.getNameById($stateParams.id,function (err,data) {
                    if(err){

                    }else {
                        console.log(data[0]);
                        supplierService.orderSubmit(sessionStorage.getItem('user_id'),sessionStorage.getItem('user_name'),$stateParams.id,data[0].name,good_id,good_name,good_num,good_price,totalprice,time,function (err,data) {
                            if (err) {
                                //do something

                            } else {
                                $('#submit_successModal').modal('show');
                            }
                        });
                        $scope.order=[];
                        if($rootScope.order){
                            $rootScope.order=[];
                        }
                        $scope.totalprice=0;
                        good_id="",good_name="",good_num="",good_price="",totalprice=0;
                    }
                });
            }else {
                $rootScope.order=$scope.order;
                $rootScope.totalprice=$scope.totalprice;
                $('#myModal').modal('show');
            }
        }
    };
});
