const express = require('express')
const router = express.Router()
const fs = require('fs')
const shortId = require('shortid')
const valueChange = require('../utils/valueChanger')
const propFunc = require('../utils/propFunction')

const propData = 'app/data/property.json'
const data = JSON.parse(fs.readFileSync(propData, 'utf-8'))
const dataTable = propFunc.createPropData(data)
const summPropList = propFunc.summPropList(dataTable)
const summMaterList = (percent) => propFunc.summMaterPrice(summPropList, percent)


router.get('/properties', (req, res) => {
    // let lastData = fs.readFileSync(propData, 'utf-8');
    // let newData = propFunc.getList(data);
    // fs.writeFileSync(propData, JSON.stringify(newData), 'utf-8')
    res.send(data)
})

router.get('/properties/forTable', (req, res) => {
    res.send(dataTable);
})

router.get('/properties/summPropList', (req, res) => {
    res.send(summPropList);
})

router.get('/properties/summMaterList', (req, res) => {
    res.send(summMaterList(0.03));
})

router.get('/properties/workSecure', (req, res) => {
    res.send(summMaterList(0.002));
})

router.get('/properties/total', (req, res) => {
    let a = summPropList[11]
    let b = summMaterList(0.03)[11]
    let c = summMaterList(0.002)[11]
    let total = a + b + c;
    res.send( {'total': total})
})

router.post('/property', (req, res) => {
    const body = req.body
    req.body._id = shortId.generate()
    propFunc.tableData1(body)
    let jsonTodoData = data
    let newData = jsonTodoData.push(body)
    fs.writeFileSync(propData, JSON.stringify(jsonTodoData), 'utf-8')
    res.send(data)
})

router.put('/property/:id', (req, res) => {
   let body = req.body
   let id = req.params.id
   let newData  = valueChange.changeValueInObject(data, id, '_id', body)
   if (newData !== -1) {
       fs.writeFileSync(propData, JSON.stringify(newData, null, 2), 'utf-8', (err) => {
           console.log(err)
       })
       return res.send(newData)
   }
   return res.status(400).send('Bad request').end()
})

router.delete('/property/:id', (req, res) => {
    let id = req.params.id
    let i = valueChange.findValueInObject(data, id, '_id')
    if (i !== -1) {
        fs.writeFileSync(propData, JSON.stringify(i), 'utf-8')
        return res.send(fs.readFileSync(propData, 'utf-8'))
    }
    return res.status(404).send(data).end()
})

module.exports = router