const express = require('express');
const router = express.Router();
const fs = require('fs');
const shortId = require('shortid');

const propData = 'app/data/persents.json';
const data = JSON.parse(fs.readFileSync(propData, 'utf-8'));
const gradeData = JSON.parse(fs.readFileSync('app/data/property.json', 'utf-8'));

router.get('/persents', (req, res) => {
    let data = fs.readFileSync(propData, 'utf-8');
    res.send(JSON.parse(data));
})

router.post('/createPersents', (req, res) => {
    const body = req.body;
    req.body._id = shortId.generate();
    let jsonTodoData = data;
    let newData = jsonTodoData.push(body);
    // console.log(typeof newData);
    fs.writeFileSync(propData, JSON.stringify(jsonTodoData), 'utf-8');
    res.send(data);
})
function changeValueInObject(obj, val, atr, change) {
    for (let i = 0; i < obj.length; i++) {
       if (obj[i][atr] === val) {
           obj[i] = change;
           obj[i][atr] = val;
           return obj;
       }
   }
   return -1;
}

router.put('/updatePersent/:id', (req, res) => {
   let body = req.body;
   let id = req.params.id;
   let newData  = changeValueInObject(data, id, '_id', body);
   if (newData !== -1) {
       fs.writeFileSync(propData, JSON.stringify(newData, null, 2), 'utf-8', (err) => {
           console.log(err);
       });
       return res.send(newData);
   }
   return res.status(400).send('Bad request').end();
});

router.delete('/deletePersent/:id', (req, res) => {
    let id = req.params.id;
    let i = findValueInObject(data, id, '_id');
    if (i !== -1) {
        fs.writeFileSync(propData, JSON.stringify(i), 'utf-8');
        return res.send(fs.readFileSync(propData, 'utf-8'));
    }
    return res.status(404).send(data).end();
});

function findValueInObject(obj, val, atr) {
    for (let i = 0; i < obj.length; i++) {
        if (obj[i][atr] === val) {
            obj.splice(i,1);
            return obj;
        } else if (obj[i][atr] === null) {
        return -1;}
    }
    return -1;
 }

module.exports = router;