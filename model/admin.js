const db = require('../config/database');

const ADMIN = {
    //회원가입은 구현은 할껀데, 외부로 보이게 하진 않을거임
    signup :  {
        createAdmin : (admin, result) => {

            let input = Object.values(admin);
            console.log(input);

            db.getConnection((err, connection) => {
                if(!err) {
                    let sql = `INSERT INTO admin_information VALUES ( ? )`;
                    connection.query(sql, [input], (err, res) => {                        
                        connection.release();
    
                        if(err) {
                            console.log("sql error " + err);
                            return result(null, err);
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
    },
    
    //로그인 구현
    signin : {
        findAdmin : (adminId) => {
            return new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if (!err) {
                        let sql = `SELECT * FROM admin_information
                                   WHERE admin_id LIKE ${adminId}`;
    
                        connection.query(sql, (err, data) => {
                            connection.release();
    
                            if (err) {
                                console.log("sql error " + err);
                                reject(err);
                            }
                            resolve(data);
                        })
                    }
                    else {
                        console.log("mysql connection error" + err);
                        throw err;
                    }
                });
            })
        }
    }
}

module.exports = ADMIN;