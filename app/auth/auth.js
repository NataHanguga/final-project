const express = require('express');
const router = express.Router();
const fs = require('fs');
const shortId = require('shortid')
var jwt = require('jsonwebtoken');
var config = require('./config');
const func = require('../utils/valueChanger')
const authData ='app/data/auth.json'
const data = JSON.parse(fs.readFileSync(authData, 'utf-8'));

router.get('/login', (req, res) => {
	res.send(data);
})

router.post('/registration', (req, res) => {
	const body = req.body;
	const password = body.password;
	body.timeReg = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')     
	body._id = shortId.generate();
	if (func.findValueById(data, body.name, 'name')=== body.name || 
			func.findValueById(data, body.email, 'email') === body.email){
		res.status(404).json({
			success: false,
			message: 'user is registered. change data or login'
		})
		return
	} else {
	let jsonData = data.push(body);
	console.log(data, body);
	fs.writeFileSync(authData, JSON.stringify(data), 'utf-8');
	}

	let token = jwt.sign({password: password}, config.secret,
		{expiresIn: '24h' });
	res.json({token: token});
})

router.post('/login', (req, res) => {
	const name = req.body.name;
	const password = req.body.password;
	req.body.timeRegLog = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')     
	console.log(func.findValueById(data, name, 'name'))
	
	if (name && password) {
		if(func.findValueById(data, name, 'name') === name && 
			func.findValueById(data, password, 'password') === password){
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
				res.send(400).send({
					success: false,
					message: 'Autification failed. Check the request'
				})
			}
	res.end()


})



module.exports = router;