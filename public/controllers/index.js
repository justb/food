supplierApp.controller('supplierCtrl',function ($scope,$rootScope,$location,$stateParams, $state, supplierService) {

    // $rootScope.user=sessionStorage.getItem('user_name');
    // $rootScope.state=sessionStorage.getItem('user_state');
    // sessionStorage.setItem('url',$location.absUrl());
    // supplierService.getSuppliers(function (err, data) {
    //     if (err) {
    //         //do something
    //     } else {
    //         $scope.suppliers = data;
    //     }
    // });
    $scope.currentKind=1;

    $scope.changeKind=function(id){
        $scope.currentKind=id;
    }
    $scope.kinds=[{id:1,name:'热菜'},{id:2,name:'冷菜'}];
    supplierService.loadGoods(function (err, data) {
        if (err) {
            //do something
        } else {
            console.log(123);
            $scope.categroys = data;
            console.log(data);
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
            $scope.totalprice+=parseFloat($scope.order[$scope.order.length-1].price);
    	}
    	else{
    		for(var k in $scope.order){
	    		if(id==$scope.order[k].id&&name==$scope.order[k].name){
	    			$scope.order[k].number++;
	    			$scope.order[k].totalprice=$scope.order[k].number*$scope.order[k].price;
                    $scope.totalprice+=parseFloat($scope.order[k].price);
	    			flag=1;
	    		}
			}
			if(flag==0){
				$scope.order.push({'id':id,'name':name,'price':price,'number':1,'totalprice':price});
                $scope.totalprice+=parseFloat($scope.order[$scope.order.length-1].price);
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
        $scope.totalprice+=parseFloat(o.price);
    };
    $scope.submitorder=function(){
        if($scope.order.length>0){
            
            angular.forEach($scope.order,function (data) {
                good_id+=data.id+" ";
                good_name+=data.name+" ";
                good_num+=data.number+" ";
                good_price+=data.price+" ";
                totalprice+=data.totalprice;
            });
            console.log($scope.order);

            supplierService.orderSubmit2($scope.order,totalprice,time,function (err,data) {
                if (err) {
                    //do something

                } else {
                    alert("点餐成功");
                }
            });
            $scope.order=[];
            if($rootScope.order){
                $rootScope.order=[];
            }
            $scope.totalprice=0;
            good_id="",good_name="",good_num="",good_price="",totalprice=0;
                    
                
            
        }
    };
});
