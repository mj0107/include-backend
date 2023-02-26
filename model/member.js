const db = require('../config/database');

const MEMBER = {
    getAll : (result) => {
        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `SELECT * FROM member_board`;
                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        return result(err, null);
                    }
                    return  result(null, res);
                })
            }
            else    {
                console.log("mysql connection error " + err);
                throw err;
            }
        })
    },
    
    getByidx : (idx, result) => {
        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `SELECT * FROM member_board WHERE ID_PK LIKE ${idx}`;
                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        return result(err, null);
                    }
                    return result(null, res);
                })
            }
            else    {
                console.log("mysql connection error " + err);
                throw err;
            }
        })
    },
    // 멤버들에 대한 데이터가
    create : (member, result) => {

        let input = Object.values(member);
        console.log(input);

        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `INSERT INTO member_board  VALUES ( ID_PK, ?)`;
                connection.query(sql, [input], (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        return result(err, null);
                    }
                    return result(null, res);
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
                let sql = `UPDATE member_board set name = ? , first_track = ?, second_track = ?, 
                           git_hub = ? , email = ?,  graduation =  ?
                           WHERE ID_PK = ${idx}`;
                connection.query(sql, updateData, (err, res) => {
                    connection.release();
                    if(err) {
                        console.log("sql error " + err);
                        return result(err, null);
                    }
                    return  result(null, res);
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
                let sql = `DELETE FROM member_board WHERE ID_PK = ${idx}`;
                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        return result(err, null);
                    }
                    return result(null, res);
                })
            }
            else    {
                console.log("mysql connection error " + err);
                throw err;
            }
        })
    }
}

module.exports = MEMBER;