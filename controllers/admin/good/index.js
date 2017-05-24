'use strict';

var IndexModel = require('../../../models/index');

var goodService = require('../../../lib/good-service.js');

module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        goodService().loadGoods(function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });
    router.post('/', function (req, res) {
        goodService().findGoods(req.body.name,function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.get('/:id', function (req, res) {
        goodService().getGoodById(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.delete('/delete/:id', function(req, res) {
        goodService().deleteGood(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.post('/edit/:id', function(req, res) {
        goodService().updateGood(req.params.id,req.body.name,req.body.price,req.body.standard,req.body.introduction,req.body.category_id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });
    router.post('/add', function(req, res) {
        goodService().addGood(req.body.name,req.body.price,req.body.standard,req.body.introduction,req.body.category_id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

};
