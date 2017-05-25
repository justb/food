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
var loadOrders = function(pagenum,pagesize,callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query("SELECT * FROM orders order by createdate desc limit ?,?",[pagenum*pagesize,pagesize], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var getCounts = function(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query("SELECT count(1) as count FROM orders", function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var findOrders = function(user_name,callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM orders where user_name like "%'+user_name+'%"',function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};


var getOrdersById = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM t_ordertotal where userid=? order by ordertime desc', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            if(results[0]){
                connection.query('SELECT * FROM t_order left join t_menu on t_order.menuid=t_menu.menuid  where t_order.orderno=?', results[0].orderno, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    connection.release();
                    return callback(null, {base:results[0],detail:result});
                });
            }else{
                return callback("error");
            }
            
            
            
        });
    });
};

var getOrdersByUserId = function(user_id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM orders where user_id=?', user_id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var addComment = function(comment,orderid, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        //两个参数
        connection.query('update t_ordertotal set comments=? where orderno=?', [comment,orderid], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var insertOrders = function(totalprice,createdate,userid,tableno, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        //两个参数
        console.log(totalprice,createdate);
        connection.query('insert into t_ordertotal set totalprice=?,ordertime=?,userid=?,tableno=?', [totalprice,createdate,userid,tableno], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var insertMenus = function(totalprice,num,createdate, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //两个参数
        connection.query('insert into t_order set menuid=?,menunum=?,orderno=?', [totalprice,num,createdate], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//insert
var addOrders = function(user_id, user_name, supplier_id,supplier_name, good_id,good_name, good_num,good_price, totalprice,createdate, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //两个参数
        connection.query('insert into orders set user_id=?, user_name=?, supplier_id=?,supplier_name=?, good_id=?,good_name=?, good_num=?,good_price=?, totalprice=?,createdate=?,state=?', [user_id, user_name, supplier_id,supplier_name, good_id,good_name, good_num,good_price, totalprice,createdate,0], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//delete
var deleteOrders = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('delete from orders where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//update
var updateOrders = function(user_id, user_name, supplier_id,supplier_name, good_id,good_name, good_num,good_price, totalprice,createdate,id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('update orders set user_id=?, user_name=?, supplier_id=?,supplier_name=?, good_id=?, good_name=?,good_num=?,good_price=?, totalprice=?,createdate=?,state=? where id=?', [user_id, user_name, supplier_id,supplier_name, good_id,good_name, good_num,good_price, totalprice,createdate,0, id], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var approvalOrders = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('update orders set state=? where id=? and state = 0', [1,id], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var rejectOrders = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('update orders set state=? where id=? and state = 0', [2,id], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var cancelOrders = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('delete from orders where id=? and state=0', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var finishOrders = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('update orders set state=? where id=?', [3,id], function(err, results) {
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
        addComment:addComment,
        insertOrders: insertOrders,
        insertMenus: insertMenus,
        loadOrders: loadOrders,
        getCounts: getCounts,
        findOrders:findOrders,
        getOrdersById: getOrdersById,
        getOrdersByUserId:getOrdersByUserId,
        addOrders: addOrders,
        deleteOrders: deleteOrders,
        updateOrders: updateOrders,
        approvalOrders:approvalOrders,
        rejectOrders:rejectOrders,
        cancelOrders:cancelOrders,
        finishOrders:finishOrders
    };
};
