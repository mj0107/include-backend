exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    else
        res.status(403).send('로그인을 해주세요');
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    else
        res.json({ message : '이미 로그인한 상태입니다' });
};
