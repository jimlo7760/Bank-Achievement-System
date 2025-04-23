const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    console.log('authenticate token');
    const token = req.cookies.authtoken;
    if (!token) {
        console.log('\tno token');
        res.json({"result": "ERROR", "message": "No token"});
        return;
    }
    // verify token
    try {
        const decoded = jwt.verify(token, process.env.MY_SECRET);
        req.username = decoded.username;
        req.title = decoded.title;
        req.position = decoded.position;
        console.log('\ttoken verified');
        next();
    } catch (err) {
        console.log('\tinvalid token');
        res.json({"result": "ERROR", "message": err.message});
        return;
    }
};

const authenticateAdmin = (req, res, next) => {
    console.log('authenticate admin');
    const token = req.cookies.authtoken;
    if (!token) {
        console.log('\tERR: no token');
        res.json({"result": "ERROR", "message": "No token"});
        return;
    }
    // verify token
    try {
        const decoded = jwt.verify(token, process.env.MY_SECRET);
        console.log('\ttoken verified');
        req.username = decoded.username;
        req.title = decoded.title;
        req.position = decoded.position;
        console.log('\tset username, title, position ', req.username, req.title, req.position);
        next();
    } catch (err) {
        console.log('\tERR: invalid token');
        res.json({"result": "ERROR", "message": err.message});
        return;
    }
};

module.exports = {
    authenticateToken,
    authenticateAdmin
};