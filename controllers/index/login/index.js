var IndexModel = require('../../../models/index');


var userService = require('../../../lib/user-service.js');

var jwt = require('jsonwebtoken');

module.exports = function (router) {

    var model = new IndexModel();



    router.post('/', function (req, res) {

            userService().userLogin(req.body.phone, req.body.password, function(err, results) {
            if (err) {
                    res.json(err);
                    return;
                }else{
                    console.log(results);
                    if(results.length>0){
                         var token = jwt.sign(results[0], 'app.get(superSecret)', {
                            'expiresIn': 1440 // 设置过期时间
                        });

                        // json格式返回token
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                   
                }
                
            });
    });
};
