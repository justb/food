supplierApp.controller('userCtrl',function ($scope,$rootScope, $stateParams,$state, supplierService) {
    $scope.user={};
    $scope.sexs=[{value:"男",name:"man"},{value:"女",name:"woman"}];
    $scope.userid=null;
    $scope.password=null;
    $scope.register=function(){
        console.log($scope.user);
    }
    $scope.register=function(){
         supplierService.userRegister($scope.user,function(err,data){
             console.log(err,data);
            if(err){
                alert("注册失败！");
            }else{
                if(data.errno){
                    alert("注册失败！");
                }else{
                    alert("注册成功！");
                }
            }
        })
    }
    $scope.login=function(){
        console.log($scope.userid,$scope.password);
         supplierService.userLogin($scope.userid,$scope.password,function(err,data){
            if(err){

            }else{
                localStorage.setItem('token',data.token);
                localStorage.setItem('user',data.userid);
                $rootScope.user=data.userid;
            }
        })
    }

    $scope.myorder=function(){
         supplierService.getOrderByUserId($rootScope.user,function(err,data){
            if(err){

            }else{
                $scope.myorder=data.base;
                $scope.myorder.detail=data.detail;
            }
        })
    }
   
// $scope.doLogin = function() {
//         supplierService.userLogin($scope.phone,$scope.password, function(err, data) {
//             if (err) {

//             } else {
//                 console.log(data);
//                 if(data.length!=0){
//                     sessionStorage.setItem('user_id',data[0].id);
//                     sessionStorage.setItem('user_name',data[0].name);
//                     sessionStorage.setItem('user_state',data[0].state);
//                     $rootScope.user=sessionStorage.getItem('user_name');
//                     $rootScope.state=sessionStorage.getItem('user_state');
//                     history.back();
//                     // console.log($rootScope.user);
//                 }


//             }
//         });

//     };
});
