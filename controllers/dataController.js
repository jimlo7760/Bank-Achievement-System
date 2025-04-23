const database = require('../config/database');
const dayjs = require('dayjs');

const getData = async (req, res) => {
    const max_date = req.query.max_date;
    const min_date = req.query.min_date;
    console.log('get data');
    try {
        const query = `SELECT name, title, position, SUM(score) AS score FROM Achievements WHERE date BETWEEN '${min_date}' AND '${max_date}' GROUP BY name, title, position ORDER BY score DESC, position, title, name`;
        var [data, field] = await database.execute(query);
        console.log('\tdata retrieved');
        res.json({"result": "OK", "message": "Data retrieved", "data": data});
    } catch (err) {
        console.log('\tERR: ', err.message);
        res.json({"result": "ERROR", "message": err.message});
    }
};

const getBranchCompare = async (req, res) => {
    const max_date = req.query.max_date;
    const min_date = req.query.min_date;
    console.log('get branch compare data');
    try {
        // const query = `SELECT position, title, SUM(score) AS score FROM Achievements GROUP BY position, title ORDER BY position, title`;
        const query = `SELECT position, SUM(score) AS score FROM Achievements WHERE date BETWEEN '${min_date}' AND '${max_date}' GROUP BY position ORDER BY position`;
        var [data, field] = await database.execute(query);
        console.log('\tdata retrieved');
        res.json({"result": "OK", "message": "Data retrieved", "data": data});
    } catch (err) {
        console.log('\tERR: ', err.message);
        res.json({"result": "ERROR", "message": err.message});
    }
};

const getPositionCompare = async (req, res) => {
    const max_date = req.query.max_date;
    const min_date = req.query.min_date;
    console.log('get position compare data');
    try {
        const query = `SELECT title, SUM(score) AS score FROM Achievements WHERE date BETWEEN '${min_date}' AND '${max_date}' GROUP BY title ORDER BY title`;
        var [data, field] = await database.execute(query);
        console.log('\tdata retrieved');
        res.json({"result": "OK", "message": "Data retrieved", "data": data});
    } catch (err) {
        console.log('\tERR: ', err.message);
        res.json({"result": "ERROR", "message": err.message});
    }
};

const getBranchPositionCompare = async (req, res) => {
    const max_date = req.query.max_date;
    const min_date = req.query.min_date;
    console.log('get branch position compare data');
    try {
        const query = `SELECT position, title, SUM(score) AS score FROM Achievements WHERE date BETWEEN '${min_date}' AND '${max_date}' GROUP BY position, title ORDER BY position, title`;
        var [data, field] = await database.execute(query);
        console.log('\tdata retrieved');
        res.json({"result": "OK", "message": "Data retrieved", "data": data});
    } catch (err) {
        console.log('\tERR: ', err.message);
        res.json({"result": "ERROR", "message": err.message});
    }
};

const checkData = async (req, res) => {
    console.log('check data');
    try {
        const { date, position, title, name } = req.body;
        if (!date || !position || !title || !name) {
            console.log('\tERR: invalid general information');
            res.json({"result": "ERROR", "message": "Incomplete General Information"});
            return;
        }
        const month_date = dayjs(date).format('YYYY-MM-DD');
        const query = `SELECT * FROM Achievements WHERE date='${month_date}' AND position='${position}' AND title='${title}' AND name='${name}'`;
        var [data, filed] = await database.execute(query);
        if (data.length == 0) {
            console.log('\tdata not found');
            res.json({"result": "OK", "message": "Data not found"});
            return;
        } else {
            console.log('\tdata found');
            res.json({"result": "FOUND", "message": "Data found"});
            return;
        }
    } catch (err) {
        console.log('\tERR: ', err.message);
        res.json({"result": "ERROR", "message": err.message});
    }
};

const insertData = async (req, res) => {
    console.log('insert data');
    try {
        const { date, position, title, name } = req.body;
        if (!date || !position || !title || !name) {
            res.json({"result": "ERROR", "message": "Incomplete General Information"});
            return;
        }
        const get_rule_query = `SELECT * FROM Rules`;
        var [rule, filed] = await database.execute(get_rule_query);
        if (rule.length == 0) {
            console.log('\tERR: rule not found');
            res.json({"result": "ERROR", "message": "The points rules for this month have not been set. Please contact the administrator."});
            return;
        }
        console.log('\trule retrieved');
        const rule_data = rule[0];
        var total_score = 0;
        for (var key in rule_data) {
            if (key == 'date' || key == 'id') {
                continue;
            }
            if (rule_data[key] == null || req.body[key] == undefined) {
                res.json({"result": "ERROR", "message": key + " is not set"});
                return;
            }
            total_score += rule_data[key] * req.body[key];
        }
        console.log('\ttotal score calculated ', total_score);
        var query = `INSERT INTO Achievements (date, score, position, title, name) VALUES ('${dayjs(date).format('YYYY-MM-DD')}', '${total_score}', '${position}', '${title}', '${name}')`;
        checkquery = `SELECT * FROM Achievements WHERE date='${dayjs(date).format('YYYY-MM-DD')}' AND position='${position}' AND title='${title}' AND name='${name}'`;
        var [check, filed] = await database.execute(checkquery);
        if (check.length > 0) {
            console.log('\tdata already exists, update data');
            query = `UPDATE Achievements SET score='${total_score}' WHERE date='${date}' AND position='${position}' AND title='${title}' AND name='${name}'`;
        }
        await database.execute(query);

        res.json({"result": "OK", "message": "Data inserted"});
    } catch (err) {
        res.json({"result": "ERROR", "message": err.message});
    }
};

const getUserData = async (req, res) => {
    try {
        res.json({"result": "OK", "message": "User data retrieved", "data": {
                "username": req.username,
                "title": req.title,
                "position": req.position
            }});
    } catch (err) {
        res.json({"result": "ERROR", "message": err.message});
    }
};

module.exports = {
    getData,
    getBranchCompare,
    getPositionCompare,
    getBranchPositionCompare,
    checkData,
    insertData,
    getUserData
};