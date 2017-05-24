'use strict';

var IndexModel = require('../../models/index');

var supplierService = require('../../lib/supplier-service.js');

module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        supplierService().loadSuppliers(function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });
    router.post('/', function (req, res) {
        supplierService().findSuppliers(req.body.name,function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.get('/:id', function (req, res) {
        supplierService().getSuppliersById(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.delete('/delete/:id', function(req, res) {
        supplierService().deleteSuppliers(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.post('/edit/:id', function(req, res) {
        supplierService().updateSuppliers(req.params.id,req.body.name,req.body.location,req.body.phone, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });
    router.post('/add', function(req, res) {
        supplierService().addSuppliers(req.body.name,req.body.location,req.body.phone, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

};
