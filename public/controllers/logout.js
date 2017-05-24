/**
 * Created by Mr Wei on 2016/7/31.
 */
function logout() {
    sessionStorage.clear();
}
function modalhide() {
    $('.modal').modal('hide');
}


$(window).scroll(function(){
   if($(window).scrollTop()>=100){
   	$("#categorymenu").css('position','fixed');
   	$("#categorymenu").css('top','0px');
   }else{
   		$("#categorymenu").css('position','absolute');
   		$("#categorymenu").css('top','90px');
   }

});
