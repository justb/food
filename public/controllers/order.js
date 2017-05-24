
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

supplierApp.controller('orderCtrl',function ($scope,$rootScope, $state, supplierService) {
    $rootScope.user=sessionStorage.getItem('user_name');
    $rootScope.state=sessionStorage.getItem('user_state');
    supplierService.getOrderByUserId(sessionStorage.getItem('user_id'),function (err, data) {
        if (err) {
            //do something
        } else {
            $scope.orders = data;
            for(i in $scope.orders){
                $scope.orders[i].createdate=new Date($scope.orders[i].createdate).Format("yyyy-MM-dd HH:mm:ss");
            }
        }
        $scope.doCancel=function(id){
        	supplierService.cancelOrderById(id,function(err,data){
        		if(err){

        		}else{
        			$state.go('order', null, {
                    reload: true
                });
        		}
        	})
        }
    });
});
/**
 * Created by Mr Wei on 2016/7/31.
 */
