var IndexModel = require('../../../models/index');


var userService = require('../../../lib/user-service.js');




module.exports = function (router) {

    var model = new IndexModel();



    router.post('/', function (req, res) {
            userService().useRegister(req.body.username,req.body.sex,req.body.userid,req.body.phone, req.body.password, function(err, results) {
            if (err) {
                    return res.json(err);
                }
            res.json(results);
            });
    });
};
