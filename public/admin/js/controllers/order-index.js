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

supplierApp.controller('OrderIndexCtrl',function ($scope, $state, orderService) {
    $scope.pagenum=0;
    $scope.pagesize=10;
    orderService.getCounts(function(err,data){
        if(err){
            console.log(err);

        }else{
            $scope.pagenums=[];
            $scope.totalPageCount=Math.floor(parseInt(data[0].count)/$scope.pagesize);
            for (var i=0; i <= $scope.totalPageCount; i++) {
                $scope.pagenums.push(i);
            }

            $scope.nextPage = function(){
                $scope.pagenum ++;
                $scope.pagenum =$scope.pagenum>$scope.totalPageCount?$scope.totalPageCount:$scope.pagenum;
                getOrders($scope.pagenum,$scope.pagesize);
            };

            $scope.previousPage = function(){
                $scope.pagenum --;
                $scope.pagenum = $scope.pagenum < 0 ? 0:$scope.pagenum;
                getOrders($scope.pagenum,$scope.pagesize);
            };

            $scope.firstPage = function() {
                $scope.pagenum = 0;
                getOrders($scope.pagenum,$scope.pagesize);
            };

            $scope.lastPage = function() {
                $scope.pagenum = $scope.totalPageCount;
                getOrders($scope.pagenum,$scope.pagesize);
            };

            $scope.pageChange=function(pagenum){
                $scope.pagenum=pagenum;
                getOrders(pagenum,$scope.pagesize);
            };
        }
    });
    var getOrders=function(pagenum,pagesize){
        orderService.getorders(pagenum,pagesize,function (err, data) {
            if (err) {
                console.log("error");
            } else {
                $scope.orders = data;
                for(i in $scope.orders){
                    $scope.orders[i].createdate=new Date($scope.orders[i].createdate).Format("yyyy-MM-dd HH:mm:ss");
                }
            }
        });
    };
    getOrders($scope.pagenum,$scope.pagesize);
    $scope.doQuery = function() {
        orderService.findOrders($scope.queryKey, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                $scope.orders = data;
            }
        });

    };
    $("#checkall").change(function(){

        if($("#checkall").prop('checked')){
            $(".checkbox").prop("checked",true);
        }
        else{
            $(".checkbox").prop("checked",false);
        }

    });
    $scope.approval = function(id) {
        orderService.approvalOrderById(id, function(err, data) {

                if (err) {

                } else {
                      $state.go('orders',{}, {
                        reload: true
                    });
                }

        });

    };
    $scope.approvalall = function() {
        for(var i=0;i<$('input[class="checkbox"]:checked').length;i++){
             orderService.approvalOrderById($('input[class="checkbox"]:checked').eq(i).attr('data-id'), function(err, data) {

                if (err) {

                } else {
                      $state.go('orders',{}, {
                        reload: true
                    });
                }

        });
        }

    };
    $scope.reject = function(id) {
        orderService.rejectOrderById(id, function(err, data) {

                if (err) {

                } else {
                     $state.go('orders',{}, {
                        reload: true
                    });
                }

        });

    };
}
);
