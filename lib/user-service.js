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
var loadUsers = function(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM user', function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var findUsers = function(name,callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM user where name like "%'+name+'%"',function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};


var getUsersById = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM user where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};


//delete
var deleteUsers = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('delete from user where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//update
var updateUsers = function(id, name,sex,age,location,phone,password, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('update user set name=? , sex=? , age=? , location=? , phone=? , password=? where id=?', [name,sex,age,location,phone,password, id], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var userLogin = function(phone, password, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM user where phone=? and password=?', [phone,password], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var useRegister = function(name,sex,age,location,phone,password, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('insert into user set name=? , sex=? , age=? , location=? , phone=? , password=?', [name,sex,age,location,phone,password], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

module.exports = function() {
    return {
        loadUsers:loadUsers,
        findUsers:findUsers,
        getUsersById:getUsersById,
        deleteUsers:deleteUsers,
        updateUsers:updateUsers,
        userLogin:userLogin,
        useRegister:useRegister
    };
};
