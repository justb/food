'use strict';

var IndexModel = require('../../../models/index');

var categoryService = require('../../../lib/category-service.js');

module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        categoryService().loadCategories(function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });
    router.post('/', function (req, res) {
        categoryService().findCategories(req.body.name,function (err,results) {
            if(err){
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.get('/:id', function (req, res) {
        categoryService().getCategoriesById(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.delete('/delete/:id', function(req, res) {
        categoryService().deleteCategories(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.post('/edit/:id', function(req, res) {
        categoryService().updateCategories(req.params.id,req.body.name,req.body.supplier_id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });
    router.post('/add', function(req, res) {
        categoryService().addCategories(req.body.name,req.body.supplier_id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

};
