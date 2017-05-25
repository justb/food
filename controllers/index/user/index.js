var userService = require('../../../lib/user-service.js');

var jwt = require('jsonwebtoken');


module.exports = function (router) {



    router.post('/register', function (req, res) {
            userService().useRegister(req.body.username,req.body.sex,req.body.userid,req.body.phone, req.body.password, function(err, results) {
            if (err) {
                    return res.json(err);
                }
            res.json(results);
            });
    });
    router.post('/login', function (req, res) {

            userService().userLogin(req.body.phone, req.body.password, function(err, results) {
            if (err) {
                    res.json(err);
                    return;
                }else{
                    console.log(results);
                    if(results.length>0){
                         var token = jwt.sign({data:results[0]}, 'app.get(superSecret)', {
                            'expiresIn': 60*60*24 // 设置过期时间
                        });

                        // json格式返回token
                        res.json({
                            userid:results[0].userid,
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }else{
                        return res.json(null);
                    }
                   
                }
                
            });
    });
};
