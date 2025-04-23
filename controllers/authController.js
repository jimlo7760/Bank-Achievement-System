const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../config/database');

const login = async (req, res) => {
    console.log('login');
    const { username, password, token } = req.body;
    try {
        if (token) {
            console.log('\tuse token to login')
            jwt.verify(token, process.env.MY_SECRET);
            console.log('\ttoken verified');
            res.json({"result": "OK", "message": "Login Success"});
        } else {
            console.log('\tuse username and password to login');
            if (!username || !password) {
                console.log('\tERR: invalid username or password');
                res.json({"result": "ERROR", "message": "Incomplete information"});
                return;
            }
            // connect to database
            var [result, field] = await database.execute(
                'SELECT name, password, title, position FROM Users WHERE name = ?',
                [username]
            );
            if (result.length == 0) {
                console.log('\tERR: invalid username', username);
                res.json({"result": "ERROR", "message": "Username or password is incorrect"});
                return;
            }
            const user = result[0];
            console.log('\tvalid username', user.name);
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                console.log('\tERR: invalid password');
                res.json({"result": "ERROR", "message": "Username or password is incorrect"});
            }
            console.log('\tvalid password');
            // generate token
            const authtoken = jwt.sign(
                {
                    username: user.name,
                    title: user.title,
                    position: user.position
                },
                process.env.MY_SECRET,
                { expiresIn: '24h' }
            );
            console.log('\ttoken generated');
            res.cookie('authtoken', authtoken, { httpOnly: true }).json({
                "result": "OK",
                "message": "Login Success",
                "data": {
                    "username": user.name,
                    "title": user.title,
                    "position": user.position,
                    "authtoken": authtoken
                }
            });
        }
    } catch (err) {
        console.log('\tERR: ', err.message);
        res.json({"result": "ERROR", "message": err.message});
    }
};

const register = async (req, res) => {
    console.log('register')
    const { username, password, position, title } = req.body;
    console.log(req.body);
    if (!username || !password || !position || !title) {
        console.log('\tERR: invalid general information');
        res.json({"result": "ERROR", "message": "Incomplete information"});
        return;
    }
    try {
        // check if username exists
        var [result, field] = await database.execute(
            'SELECT name FROM Users WHERE name = ?',
            [username]
        );

        if (result.length > 0) {
            console.log('\tERR: username already exists');
            res.json({"result": "ERROR", "message": "Username already exists"});
            return;
        }
        console.log('\tvalid username');
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('\tpassword hashed');
        // insert user
        var [insertResult, field] = await database.execute(
            'INSERT INTO Users (name, password, title, position) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, title, position]
        );
        console.log('\tuser inserted');
        // generate token
        const authtoken = jwt.sign(
            {
                username: username,
                title: title,
                position: position
            },
            process.env.MY_SECRET,
            { expiresIn: '24h' }
        );
        console.log('\ttoken generated');
        res.cookie('authtoken', authtoken, { httpOnly: true }).json({
            "result": "OK",
            "message": "Sign up success",
            "data": {
                "username": username,
                "title": title,
                "position": position,
                "authtoken": authtoken
            }
        });
    } catch (err) {
        console.log('\tERR: ', err.message);
        res.json({"result": "ERROR", "message": err.message});
    }
};

const checkCookie = (req, res) => {
    res.json({
        "result": "OK",
        "message": "Cookie is valid",
        "data": {
            "username": req.username,
            "title": req.title,
            "position": req.position
        }
    });
};

module.exports = {
    login,
    register,
    checkCookie
};