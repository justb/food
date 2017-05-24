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

var getNameById = function(id,callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT name FROM supplier where id=?',id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var findSuppliers = function(name,callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM supplier where name like "%'+name+'%"',function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};


var getSuppliersById = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM supplier where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//insert
var addSuppliers = function(name, location, phone, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //两个参数
        connection.query('insert into supplier set name=?, location=?, phone=?', [name, location,phone], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//delete
var deleteSuppliers = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('delete from supplier where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//update
var updateSuppliers = function(id, name, location, phone, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('update supplier set name=?, location=? ,phone=? where id=?', [name, location, phone, id], function(err, results) {
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
        getNameById:getNameById,
        loadSuppliers: loadSuppliers,
        findSuppliers:findSuppliers,
        getSuppliersById: getSuppliersById,
        addSuppliers: addSuppliers,
        deleteSuppliers: deleteSuppliers,
        updateSuppliers: updateSuppliers
    };
};
