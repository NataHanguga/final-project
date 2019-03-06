const express = require('express');
const router = express.Router();
const fs = require('fs');
const shortId = require('shortid');

const teachersData = 'app/data/teachers.json';
const gradeData = JSON.parse(fs.readFileSync('app/data/property.json', 'utf-8'));
const percentData = JSON.parse(fs.readFileSync('app/data/persents.json', 'utf-8'));
const loadVolumeData = JSON.parse(fs.readFileSync('app/data/loadVolume.json', 'utf-8'));
const data = JSON.parse(fs.readFileSync(teachersData, 'utf-8'));

router.get('/teachers', (req, res) => {
    res.send(data);
    // fs.writeFileSync('f.odt', 'data.price', 'utf-8');
});


const experiencePercent = (body) => {
    if (body < 3) {
        return 0;
    } else if (body <= 9) {
        return 10;
    } else if (body <= 19) {
        return 20;
    } else if (body > 19) {
        return 30;
    }
}

const increase = (body) => {
    for (i = 0; i < percentData.length; i++) {
        if (body === percentData[i].learningPosition) {
            return percentData[i].percent;
        } else if (body === 'none' || body !== percentData[i].learningPosition) {
            return 0;
        }
    }
}

const price = (body) => {
    for (let i = 0; i < gradeData.length; i++) {
        if (body === gradeData[i].level) {
            return gradeData[i].price;
        }
    }
}

const loadVolume = (body) => {
    for (let i = 0; i < loadVolumeData.length; i++) {
        if (loadVolumeData[i].time === body) {
            return loadVolumeData[i].rate;
        }
    }
}
function paramsOfTeacher(body) {
    body.price = price(body.grade);
    body.increase = increase(body.pedagogicalTitle) * body.price;
    body.mounthTarif = body.increase + body.price;
    body.experiencePercent = experiencePercent(body.experience);
    body.premium = (body.experiencePercent * body.mounthTarif) / 100;
    body.twentyPersent = body.mounthTarif * 0.2;
    body.mounthTarifTotal = body.mounthTarif + body.twentyPersent + body.premium;
    body.load.loadTotal = body.load.teachHours + body.load.concertmasterHours;
    body.loadVolume = loadVolume(body.load.loadTotal);
    body.salary = Number((body.loadVolume * body.mounthTarif).toFixed(2));
    body.twentyPersent2 = Number((body.salary * 0.2).toFixed(2));
    body.total = body.mounthTarifTotal * body.loadVolume;
    body.inAll = body.total - body.twentyPersent2;
    // body._id = shortId.generate();
    return body;
}

router.post('/createTeacher', (req, res) => {
    let body = req.body;
    body._id = shortId.generate();
    paramsOfTeacher(body);
    let jsonData = data;
    jsonData.push(body);
    fs.writeFileSync(teachersData, JSON.stringify(jsonData), 'utf-8');
    res.send(body);
});

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

router.put('/updateTeacher/:id', (req, res) => {
    let body = req.body;
    let id = req.params.id;
    let newData = changeValueInObject(data, id, '_id', body);
    if (newData !== -1) {
        paramsOfTeacher(body);      
        fs.writeFileSync(teachersData, JSON.stringify(newData, null, 2), 'utf-8', (err) => {
            console.log(err);
        });
        return res.send(newData);
    }
    return res.status(400).send('Bad request').end();
});

router.delete('/deleteTeacher/:id', (req, res) => {
    let id = req.params.id;
    let i = findValueInObject(data, id, '_id');
    if (i !== -1) {
        fs.writeFileSync(teachersData, JSON.stringify(i), 'utf-8');
        return res.send(JSON.parse(fs.readFileSync(teachersData, 'utf-8')));
    }
    return res.status(404).send(data).end();
});

function findValueInObject(obj, val, atr) {
    for (let i = 0; i < obj.length; i++) {
        if (obj[i][atr] === val) {
            obj.splice(i, 1);
            return obj;
        } else if (obj[i][atr] === null) {
            return -1;
        }
    }
    return -1;
}

module.exports = router;