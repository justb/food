/**
 * Created by Mr Wei on 2016/7/30.
 */
'use strict';

var IndexModel = require('../../../models/index');

var orderService = require('../../../lib/order-service.js');

module.exports = function (router) {

    var model = new IndexModel();

    router.post('/s', function (req, res) {
        orderService().loadOrders(req.body.pagenum,req.body.pagesize,function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.get('/', function (req, res) {
        orderService().getCounts(function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });
    router.post('/', function (req, res) {
        orderService().findOrders(req.body.user_name,function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.get('/:id', function (req, res) {
        orderService().getOrdersById(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.delete('/delete/:id', function(req, res) {
        orderService().deleteOrders(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.get('/approval/:id', function(req, res) {
        orderService().approvalOrders(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.get('/reject/:id', function(req, res) {
        orderService().rejectOrders(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.post('/edit/:id', function(req, res) {
        orderService().updateOrders(req.params.id,req.body.user_id,req.body.user_name,req.body.supplier_id,req.body.supplier_name,req.body.good_id,req.body.good_name,req.body.good_num,req.body.good_price,req.body.totalprice,req.body.createdate, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });
    router.post('/add', function(req, res) {
        orderService().addOrders(req.body.user_id,req.body.user_name,req.body.supplier_id,req.body.supplier_name,req.body.good_id,req.body.good_name,req.body.good_num,req.body.good_price,req.body.totalprice,req.body.createdate, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

};
