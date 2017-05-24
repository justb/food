/**
 * Created by Mr Wei on 2016/7/31.
 */
function back() {
    location.href=sessionStorage.getItem('url');
}
var wait1000 =  ()=> new Promise((resolve, reject)=> {setTimeout(resolve, 1000)});
wait1000()
    .then(function() {
        console.log('Yay!')
        return wait1000()
    })
    .then(function() {
        console.log('Wheeyee!')
    });

    var wait1000 =  new Promise(function(resolve, reject) {
  setTimeout(resolve, 1000);
}).then(function() {
  console.log('Yay!');
});