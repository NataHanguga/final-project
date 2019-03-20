const express = require('express')
const router = express.Router()
const fs = require('fs')
const shortId = require('shortid')
const teachers = require('../utils/teachers')
const valueChange = require('../utils/valueChanger')
const doc = require('../utils/generateDocument');

const teachersData = 'app/data/teachers.json'
const data = JSON.parse(fs.readFileSync(teachersData, 'utf-8'))

router.get('/teachers', (req, res) => {
    // console.log(data.length);
    let model = {}
    let newData = []
    for (let i = 0; i < data.length; i++) {
        model = {
            "fullName": data[i].fullName,
            "education": data[i].education,
            "category": data[i].category,
            "year": data[i].year,
            "grade": data[i].grade,
            "pedagogicalTitle": data[i].pedagogicalTitle,
            "experience": data[i].experience,
            "teachHours": data[i].teachHours,
            "concertmasterHours": data[i].concertmasterHours,
            "department": data[i].department
        }
    newData.push(teachers.paramsOfTeacher(model))
    }
    doc.createDocMidleTarifPrice();
    // console.log(newData);
    res.send(data)
})

router.get('/teacher/:id', (req, res) => {
    let id = req.params.id
    let newData = valueChange.findValueById(data, id, '_id');
    if (newData == -1) res.sendStatus(404);
    
    res.send(newData)
})

router.get('/teacherSumm', (req, res) => {
    res.status(200).send(teachers.summ(data));
})

router.post('/teacher', (req, res) => {
    let body = req.body
    body._id = shortId.generate()
    teachers.paramsOfTeacher(body)
    let jsonData = data
    jsonData.push(body)
    fs.writeFileSync(teachersData, JSON.stringify(jsonData), 'utf-8')
    res.send(body)
})

router.put('/teacher/:id', (req, res) => {
    let body = req.body
    let id = req.params.id
    let newData = valueChange.changeValueInObject(data, id, '_id', body);
    if (newData !== -1) {
        teachers.paramsOfTeacher(body)  
        fs.writeFileSync(teachersData, JSON.stringify(newData, null, 2), 'utf-8', (err) => {
            console.log(err)
        });
        return res.send(newData)
    }
    return res.status(400).send('Bad request').end();
});

router.delete('/teacher/:id', (req, res) => {
    let id = req.params.id;
    let i = valueChange.findValueInObject(data, id, '_id');
    if (i !== -1) {
        fs.writeFileSync(teachersData, JSON.stringify(i), 'utf-8');
        return res.send(JSON.parse(fs.readFileSync(teachersData, 'utf-8')));
    }
    return res.status(404).send(data).end();
});

module.exports = router;