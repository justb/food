/**
 * Created by Mr Wei on 2016/7/30.
 */
'use strict';

var IndexModel = require('../../../models/index');

var orderService = require('../../../lib/order-service.js');

module.exports = function (router) {

    var model = new IndexModel();


    router.post('/', function (req, res) {
        orderService().findOrders(req.body.user_name,function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.get('/:user_id', function (req, res) {
        orderService().getOrdersByUserId(req.params.user_id, function(err, results) {
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

    router.delete('/cancel/:id', function(req, res) {
        orderService().cancelOrders(req.params.id, function(err, results) {
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
    router.post('/insert', function(req, res) {
        console.log(req.body);
        orderService().insertOrders(req.body.totalprice,req.body.createdate, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json('ok');
            console.log(results);
            req.body.order.forEach(function(item){
                orderService().insertMenus(item.id,results.insertId, function(err, result) {
                    if (err) {
                        return res.json(err);
                    }
                });
            })

            
        });
    });

    

};

