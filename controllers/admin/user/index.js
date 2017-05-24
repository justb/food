'use strict';

var IndexModel = require('../../../models/index');

var userService = require('../../../lib/user-service.js');

module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        userService().loadUsers(function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });
    router.post('/', function (req, res) {
        userService().findUsers(req.body.name,function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.get('/:id', function (req, res) {
        userService().getUsersById(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.delete('/delete/:id', function(req, res) {
        userService().deleteUsers(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.post('/edit/:id', function(req, res) {
        userService().updateUsers(req.params.id,req.body.name,req.body.sex,req.body.age,req.body.location,req.body.phone,req.body.password, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });
    router.post('/add', function(req, res) {
        userService().useRegister(req.body.name,req.body.sex,req.body.age,req.body.location,req.body.phone,req.body.password, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

};
/**
 * Created by Mr Wei on 2016/7/31.
 */
