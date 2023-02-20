const bcrypt = require('bcrypt');
const admin = require('../model/admin');

//넘어오는건 관리자 계정 밖에 없음, 애초에 설계를 그렇게 함
let loginRequired = (req, res, next) => {
    if (!req.user) 
        return res.status(401).json({ status: 'Please log in' });
    return next();
}

module.exports = loginRequired;