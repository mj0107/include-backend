const db = require('../config/database');

const ACTIVITY = {
    getActivityByPeriod : (data, result) => {
        let period = {
            year : data[0],
            semester : data[1]
        }

        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `SELECT DETAILS, TITLE FROM ACTIVITY_BOARD_TB
                           WHERE YEAR LIKE ${period.year}
                           AND SEMESTER LIKE ${period.semester}`;
                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        result(err, null);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.log("mysql connection error " + err);
                throw err;
            }
        })
    },

    getActivityById : (idx, result) => {
        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `SELECT YEAR, SEMESTER, DETAILS, TITLE, COMPLETE FROM ACTIVITY_BOARD_TB
                           WHERE ID_PK LIKE ${idx}`;
                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        result(err, null);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.log("mysql connection error " + err);
                throw err;
            }
        })
    },

    create : (activity, result) => {

        let input = Object.values(activity);
        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `INSERT INTO ACTIVITY_BOARD_TB VALUES ( ID_PK, ? )`;
                connection.query(sql, [input], (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        result(err, null);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.log("mysql connection error " + err);
                throw err;
            }
        })
    },

    modify : (idx, data, result) => {

        let updateData = Object.values(data);

        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `UPDATE ACTIVITY_BOARD_TB set
                           YEAR = ?, SEMESTER = ?, DETAILS = ?, TITLE = ?
                           WHERE ID_PK = ${idx}`;
                connection.query(sql, updateData, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        result(err, null);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.log("mysql connection error " + err);
                throw err;
            }
        })
    },

    destroy : (idx, result) => {
        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `DELETE FROM ACTIVITY_BOARD_TB WHERE ID_PK = ${idx}`;
                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        result(err, null);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.log("mysql connection error " + err);
                throw err;
            }
        })
    }
}

module.exports = ACTIVITY;