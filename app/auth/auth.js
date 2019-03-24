const express = require('express');
const router = express.Router();
const fs = require('fs');
const shortId = require('shortid')
var jwt = require('jsonwebtoken');
var config = require('./config');

const authData ='app/data/auth.json'
const data = JSON.parse(fs.readFileSync(authData, 'utf-8'));

router.get('/login', (req, res) => {
    res.send(authData);
})

router.post('/registration', (req, res) => {
    const body = req.body;
    const password = body.password;
    fs.writeFileSync(authData, JSON.stringify(body), 'utf-8');
    body._id = shortId.generate();
    let token = jwt.sign({password: password}, config.secret,
        {expiresIn: '24h' });
    res.json({token: token});
})

router.post('/login', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    const testname = data.name;
    const testpassword = data.password;

    if (name && password) {
        if (name === testname && password === testpassword) {
            let token = jwt.sign({password: password}, config.secret,
                {expiresIn: '24h' });
              res.json({ token: token });
        } else {
            res.status(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.send(400).json({
            success: false,
            message: 'Autification failed. Check the request'
        })
    }


})

module.exports = router;