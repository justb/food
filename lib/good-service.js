/**
 * Created by lwei on 2016/7/22.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'wechat'
});

//查找
var loadGoods = function(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM t_menu', function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var findGoods = function(name,callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM t_menu where name like "%'+name+'%"',function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};


var getGoodsById = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM t_menu where id=?', id, function(err, results) {
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
        connection.query('SELECT * FROM t_menu where kind=?', category_id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//insert
var addGoods = function(name,price,standard,introduction, category_id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //两个参数
        connection.query('insert into t_menu set name=?,price=?,standard=?,introduction=? ,kind=?' ,[name, price,standard,introduction,category_id], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//delete
var deleteGoods = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('delete from t_menu where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//update
var updateGoods = function(id,name,price,standard,introduction, category_id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('update t_menu set name=?,price=?,standard=?,introduction=? ,kind=? where id=?' ,[name, price,standard,introduction,category_id,id], function(err, results) {
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
        loadGoods: loadGoods,
        findGoods:findGoods,
        getGoodById: getGoodsById,
        addGood: addGoods,
        deleteGood: deleteGoods,
        updateGood: updateGoods,
        getGoodsByCategroy:getGoodsByCategroy
    };
};
