var IndexModel = require('../../../models/index');


var categoryService = require('../../../lib/category-service.js');
var goodService = require('../../../lib/good-service.js');
var supplierService = require('../../../lib/supplier-service.js');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/:id', function (req, res) {
        categoryService().getCategoriesBySupplier(req.params.id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });

    router.post('/', function (req, res) {

            goodService().getGoodsByCategroy(req.body.category_id, function(err, results) {
            if (err) {
                    return res.json(err);
                }
            res.json(results);
            });
    });

    router.get('/', function (req, res) {

            goodService().loadGoods(function(err, results) {
            if (err) {
                    return res.json(err);
                }
            res.json(results);
            });
    });

    router.post('/get', function (req, res) {

        supplierService().getNameById(req.body.supplier_id, function(err, results) {
            if (err) {
                return res.json(err);
            }
            res.json(results);
        });
    });
};
