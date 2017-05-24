var IndexModel = require('../../models/index');

var supplierService = require('../../lib/supplier-service.js');
var categoryService = require('../../lib/category-service.js');
var goodService = require('../../lib/good-service.js');

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

    router.get('/:id', function (req, res) {
        categoryService().getCategoriesBySupplier(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    // router.get('/:id', function (req, res) {
    // 	categoryService().getCategoriesBySupplier(req.params.id, function(err, results) {
    //         if (err) {
    //             return res.json(err);
    //         }
    //         for(var k in json(results)){
    //         	goodService().getGoodsByCategroy(json(results)[k].id, function(err, results) {
	   //          if (err) {
	   //              return res.json(err);
	   //          }
	   //          res.json(results);
    //     	});
    //         }
    //     });

    // });
};