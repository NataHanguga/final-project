exports.changeValueInObject = (obj, val, atr, change) => {
    for (let i = 0; i < obj.length; i++) {
        if (obj[i][atr] === val) {
            obj[i] = change
            obj[i][atr] = val
            return obj
        }
    }
    return -1
}

exports.findValueInObject = (obj, val, atr) => {
    for (let i = 0; i < obj.length; i++) {
        if (obj[i][atr] === val) {
            obj.splice(i, 1)
            return obj;
        } else if (obj[i][atr] === null) {
            return -1
        }
    }
    return -1
}

exports.findValueById = (obj, val, atr) => {
    for (let i = 0; i < obj.length; i++) {
        if (obj[i][atr] === val) return obj[i][atr];
        else if (obj[i][atr] === null) return -1
    }
    return -1
}

exports.summ = (obj, atr) => {
    let count = 0
    for (let i = 0; i < obj.length; i++) {
        count += +obj[i][atr];
    }
    return count;
}