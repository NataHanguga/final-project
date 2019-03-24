const value = require('./valueChanger');

exports.getList = (body) => {
    let list = []; // tableData(body);
    let teachData = [];
    for (let i = 0; i < body.length; i++) {
        if (body[i].staffUnitsAmounts === 0) {
            teachData.push(body[i])
        }
    }
    list.push(teachData);
    return list
}

const tableData = (body) => {
    let propItem = []
    for (let i = 0; i < body.length; i++) {
        if (body[i].staffUnitsAmounts !== 0) {
            propItem.push(body[i])
        }
    }
    for (let i = 0; i < propItem.length; i++) {
        if (propItem[i].level === '13') {
            propItem[i].serviceYears = propItem[i].price * 0.3
            propItem[i].twentyPercents = propItem[i].serviceYears * 0.3
        } else {
            propItem[i].serviceYears = 0
            propItem[i].twentyPercents = 0
        }

        if (propItem[i].position === 'cleanining worker') {
            propItem[i].addPrice = propItem[i].price * 0.1
        } else {
            propItem[i].addPrice = 0

        }

        propItem[i]
            .priceFondByMounth = (+propItem[i].twentyPercents +
                +propItem[i].serviceYears +
                +propItem[i].addPrice +
                +propItem[i].price) *
            +propItem[i].staffUnitsAmounts;

        propItem[i].priceFondByYear = propItem[i].priceFondByMounth * 12;
        propItem[i].summ = +propItem[i].priceFondByYear + +propItem[i].price * 2
    }
    return propItem
}

exports.tableData1 = (body) => {
    if (body.staffUnitsAmounts !== 0) {

        if (body.level === '13') {
            body.serviceYears = body.price * 0.3
            body.twentyPercents = body.serviceYears * 0.3
        } else {
            body.serviceYears = 0
            body.twentyPercents = 0
        }

        if (body.position === 'cleaning worker') {
            body.addPrice = body.price * 0.1
        } else {
            body.addPrice = 0

        }

        body.priceFondByMounth = (+body.twentyPercents +
                                +body.serviceYears +
                                +body.addPrice +
                                +body.price) *
                            +body.staffUnitsAmounts;

        body.priceFondByYear = body.priceFondByMounth * 12;
        body.summ = +body.priceFondByYear + +body.price * 2

    } else {
        return body
    }
    return body
}

exports.createPropData = (body) => {
    return tableData(body);
    // let propItem = []
    // for (let i = 0; i < body.length; i++) {
    //     if (body[i].staffUnitsAmounts !== 0) {
    //         propItem.push(body[i])
    //     }
    // }
    // for (let i = 0; i < propItem.length; i++) {
    //     if (propItem[i].level === '13') {
    //         propItem[i].serviceYears = propItem[i].price * 0.3
    //         propItem[i].twentyPercents = propItem[i].serviceYears * 0.3
    //     }
    //     else {
    //         propItem[i].serviceYears = 0
    //         propItem[i].twentyPercents = 0
    //     }

    //     if (propItem[i].position === 'cleaning worker') {
    //         propItem[i].addPrice = propItem[i].price * 0.1
    //     } else {
    //       propItem[i].addPrice = 0

    //     }

    //     propItem[i]
    //         .priceFondByMounth = (+propItem[i].twentyPercents +
    //                             +propItem[i].serviceYears +
    //                             +propItem[i].addPrice +
    //                             +propItem[i].price )
    //                             * +propItem[i].staffUnitsAmounts;

    //     propItem[i].priceFondByYear = propItem[i].priceFondByMounth * 12;
    //     propItem[i].summ = +propItem[i].priceFondByYear + +propItem[i].price * 2
    // }
    // return propItem
}

exports.summPropList = (body) => {
    let summ = []
    summ.push(undefined, value.summ(body, 'staffUnitsAmounts'),
        undefined, undefined, undefined, undefined, undefined,
        value.summ(body, 'priceFondByMounth'),
        value.summ(body, 'priceFondByYear'),
        value.summ(body, 'price'),
        value.summ(body, 'price'),
        value.summ(body, 'summ'))
    // console.log(value.summ(body, 'priceFondByMounth'))
    return summ
}

exports.summMaterPrice = (body, percent) => {
    let summ = []
    summ.push(
        undefined, undefined, undefined,
        undefined, undefined, undefined,
        undefined,
        +(body[7] * +percent).toFixed(2),
        +(body[8] * percent).toFixed(2),
        undefined, undefined,
        +(body[11] * percent).toFixed(2)
    )
    return summ
}