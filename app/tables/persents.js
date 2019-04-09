const express = require('express')
const router = express.Router()
const fs = require('fs')
const shortId = require('shortid')
const valueChange = require('../utils/valueChanger');

const propData = 'app/data/persents.json'
const data = JSON.parse(fs.readFileSync(propData, 'utf-8'))

router.get('/percents', (req, res) => {
  let data = fs.readFileSync(propData, 'utf-8')
  // console.log(data);
  res.send(JSON.parse(data))
})

router.post('/percent', (req, res) => {
  req.body._id = shortId.generate()
  let jsonTodoData = data.push(req.body);
  // console.log(jsonTodoData, body)
  fs.writeFileSync(propData, JSON.stringify(data), 'utf-8')
  res.send(data)
})

router.put('/percent/:id', (req, res) => {
  let body = req.body
  let id = req.params.id
  let newData = valueChange.changeValueInObject(data, id, '_id', body)
  if (newData !== -1) {
    fs.writeFileSync(propData, JSON.stringify(newData, null, 2), 'utf-8', (err) => {
      console.log(err)
    })
    return res.send(newData)
  }
  return res.status(400).send('Bad request').end()
})

router.delete('/percent/:id', (req, res) => {
  let id = req.params.id
  let i = valueChange.findValueInObject(data, id, '_id')
  console.log(id)
  if (i !== -1) {
    fs.writeFileSync(propData, JSON.stringify(i), 'utf-8')
    res.send(JSON.parse(fs.readFileSync(propData, 'utf-8')))
  }
  res.status(404).send(data).end()
})

module.exports = router;