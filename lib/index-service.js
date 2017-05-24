var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'wei4799',
    port: 3307,
    database: 'order'
});

//查找
var loadSuppliers = function(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM supplier', function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var getCategoriesBySupplier = function(supplier_id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM category where supplier_id=?', supplier_id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var getGoodsByCategroy = function(category_id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM goods where category_id=?', category_id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};
