/**
 * Created by lwei on 2016/7/22.
 */
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
var loadCategories = function(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM category', function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var findCategories = function(name,callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM category where name like "%'+name+'%"',function(err, results) {
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

var getCategoriesById = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM category where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//insert
var addCategories = function(name, supplier_id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //两个参数
        connection.query('insert into category set name=?, supplier_id=?' ,[name, supplier_id], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//delete
var deleteCategories = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('delete from category where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//update
var updateCategories = function(id, name, supplier_id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('update category set name=?, supplier_id=? where id=?', [name, supplier_id, id], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};



//模块化
module.exports = function() {
    return {
        loadCategories: loadCategories,
        findCategories:findCategories,
        getCategoriesById: getCategoriesById,
        addCategories: addCategories,
        deleteCategories: deleteCategories,
        updateCategories: updateCategories,
        getCategoriesBySupplier:getCategoriesBySupplier
    };
};
