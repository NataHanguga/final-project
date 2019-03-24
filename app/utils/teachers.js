const fs = require('fs')
const gradeData = JSON.parse(fs.readFileSync('app/data/property.json', 'utf-8'))
const percentData = JSON.parse(fs.readFileSync('app/data/persents.json', 'utf-8'))
const loadVolumeData = JSON.parse(fs.readFileSync('app/data/loadVolume.json', 'utf-8'))
const valueChange = require('../utils/valueChanger')

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
        // console.log(percentData[i].learningPosition)
        if (body === percentData[i].learningPosition) {
            return percentData[i].percent;
        } else if (body === 'none' && body !== percentData[i].learningPosition) {
            return 0;
        }
    }
}

const price = (level, position) => {

    for (let i = 0; i < gradeData.length; i++) {
        // console.log(gradeData[i].level)

        if ((+gradeData[i].level === level) || (gradeData[i].position ===position)) {
            // 
            // console.log(gradeData[i].position)
            return gradeData[i].price;
        } else {

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

exports.paramsOfTeacher = (body) => {

    body.price = price(body.grade, body.category); // ставка
    body.increase = increase(body.pedagogicalTitle)/100 * body.price; //підвищення ставки
    body.mounthTarif = body.increase + body.price; // місячний тариф 1
    body.percent = increase(body.pedagogicalTitle); //оплата в % заучу
    body.experiencePercent = experiencePercent(body.experience); // % за стаж
    body.premium = (body.experiencePercent * body.mounthTarif) / 100; // надбавка
    body.twentyPersent = body.mounthTarif * 0.2; // 20%1
    body.mounthTarifTotal = body.mounthTarif + body.twentyPersent + body.premium; // місячний тариф разом
    body.loadTotal = Number(body.teachHours) + Number(body.concertmasterHours); // разом
    body.loadVolume = loadVolume(body.loadTotal); // обсяг пед навантаження
    body.salary = Number((body.loadVolume * body.mounthTarif).toFixed(2)); //тар ставка + навантаження
    body.twentyPersent2 = +((body.salary * 0.2).toFixed(2)); // 20%2
    body.total = +body.mounthTarifTotal * body.loadVolume; //zp
    body.inAll = +(body.total - body.twentyPersent2).toFixed(2); //всього
    body.tarifAndIncrease = +(body.salary * body.percent / 100).toFixed(2); // опплата в грн заучу
    return body;
}

exports.summ = (data) => {
    let summArray = [];
    summArray.push(
        +valueChange.summ(data, 'teachHours').toFixed(2), //0
        +valueChange.summ(data, 'concertmasterHours').toFixed(2), //1
        +valueChange.summ(data, 'loadTotal').toFixed(2), //2
        +valueChange.summ(data, 'loadVolume').toFixed(2), //3
        +valueChange.summ(data, 'salary').toFixed(2), //4
        +valueChange.summ(data, 'total').toFixed(2), //5
        +valueChange.summ(data, 'twentyPersent2').toFixed(2), //6
        +valueChange.summ(data, 'inAll').toFixed(2),
        +valueChange.summ(data, 'mounthTarif').toFixed(2))
    return summArray
}