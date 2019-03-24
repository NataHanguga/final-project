const fs = require('fs')
const docx = require('docx')
const teachersData = JSON.parse(fs.readFileSync('app/data/teachers.json', 'utf-8'))
const data = JSON.parse(fs.readFileSync('app/data/property.json', 'utf-8'))
const func = require('./tableGeneratorFunc');
const teachers = require('./teachers')
const prop = require('./propFunction')

const propList = prop.createPropData(data);
const summPropList = prop.summPropList(propList)
const summMaterList = (percent) => prop.summMaterPrice(summPropList, percent)

exports.createDocTarifList = (fileName) => {
    const doc = new docx.Document(undefined, {
        orientation: 'landscape'
    });
    const arr = ['Начальник відділу культури,',
        'туризму та культурної спадщини',
        'райдержадміністрації',
        'МП _____________      підпис',
        '«__»__________ 20___ р.'
    ];
    const headArr = ['ТАРИФІКАЦІЙНИЙ СПИСОК',
        'педагогічних працівників',
        '____________________ дитяча школа мистецтв',
        '(назва спеціалізованого мистецького навчального закладу)',
        'станом на ________________'
    ];
    const headerTable = ['№', 'Прізвище, ім\'я та по батькові',
        'Освіта', 'Посада, рік', 'Розряд', 'Тарифна ставка',
        'Педагогічне звання', 'Розмір підвищень',
        'Місячний тариф з урахуванням підвищень',
        'Стаж роботи', '%', 'Розмір Надбавки за вислугу років',
        '20%', 'Місячний тариф з урахуванням підвищень'
    ];

    func.printRightText(arr, doc);
    func.printCentralText(headArr, doc);
    const headerTableSize = headerTable.length;
    const teachersDataSize = teachersData.length;
    const table = new docx.Table(teachersDataSize + 2, headerTableSize);

    table.setWidth(docx.WidthType.PERCENTAGE, '100%');
    for (let i = 0; i < headerTableSize; i++) {
        let par = new docx.Paragraph();
        let par1 = new docx.Paragraph();
        let num = new docx.TextRun(i + 1).font('Liberation Serif');
        let header = new docx.TextRun(headerTable[i]).font('Liberation Serif');
        par1.addRun(num);
        par.addRun(header);
        table.getCell(0, i).addContent(par);
        table.getCell(1, i).addContent(par1);
    }

    for (let i = 0; i < teachersData.length; i++) {
        if (teachersData[i].pedagogicalTitle === 'none') {
            teachersData[i].pedagogicalTitle = '';  
            console.log(i)
        }
    }

    func.printTable(table, 1, teachersData, 'fullName',2);
    func.printTable(table, 2, teachersData, 'education',2);
    func.printTable(table, 3, teachersData, 'category',2);
    func.printTable(table, 3, teachersData, 'year',2);
    func.printTable(table, 4, teachersData, 'grade',2);
    func.printTable(table, 5, teachersData, 'price',2);
    func.printTable(table, 6, teachersData, 'pedagogicalTitle',2);
    func.printTable(table, 7, teachersData, 'increase',2);
    func.printTable(table, 8, teachersData, 'mounthTarif',2);
    func.printTable(table, 9, teachersData, 'experience',2);
    func.printTable(table, 10, teachersData, 'experiencePercent',2);
    func.printTable(table, 11, teachersData, 'premium',2);
    func.printTable(table, 12, teachersData, 'twentyPersent',2);
    func.printTable(table, 13, teachersData, 'mounthTarifTotal',2);

    for (let i = 2; i < teachersDataSize + 2; i++) {
        let num = new docx.TextRun(i - 1).font('Liberation Serif')
        let par = new docx.Paragraph();
        table.getCell(i, 0).addContent(par.addRun(num));
    }
    doc.addTable(table);


    const packer = new docx.Packer()

    packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync('../../../'+fileName + '.docx', buffer);
        fs.writeFileSync('fileDataBase/'+fileName + '.docx', buffer);
    });
}

exports.createDocManagerTarifList = (fileName) => {
    const doc = new docx.Document(undefined, {
        orientation: 'landscape'
    });

    const headerTitle = ['№', 'Прізвище, ім\'я та по батькові',
        'Відділ', 'Тарифна ставка з урахуванням підвищень',
        'Розмір оплати, %', 'Розмір оплати, грн'
    ];

    func.printCentralParagraph(' Оплата праці завідуючих відділами (відділення)', doc);
    func.printCentralParagraph('\n\n', doc); // empty line
    const list = func.getArrayByParam(teachersData, 'pedagogicalTitle', 'manager');
    const table = new docx.Table(list.length+3, headerTitle.length);
    table.setWidth(docx.WidthType.PERCENTAGE, '100%');

    for (let i = 0; i < headerTitle.length; i++) {
        let par = new docx.Paragraph();
        let par1 = new docx.Paragraph();
        let num = new docx.TextRun(i + 1).font('Liberation Serif');
        let header = new docx.TextRun(headerTitle[i]).font('Liberation Serif');
        par1.addRun(num);
        par.addRun(header);
        table.getCell(0, i).addContent(par);
        table.getCell(1, i).addContent(par1);
    }

    for (let i = 2; i < list.length + 2; i++) {
        let num = new docx.TextRun(i - 1).font('Liberation Serif')
        let par = new docx.Paragraph();
        table.getCell(i, 0).addContent(par.addRun(num));
    }

    func.printTable(table, 1, list, 'fullName' ,2);
    func.printTable(table, 2, list, 'department' ,2);
    func.printTable(table, 3, list, 'salary' ,2);
    func.printTable(table, 4, list, 'percent',2);
    func.printTable(table, 5, list, 'tarifAndIncrease' ,2);
    table.getRow(list.length+2).mergeCells(0,4);
    let text = new docx.TextRun('Всього:').bold().font('Liberation Serif');
    let per = new docx.Paragraph();
    per.addRun(text).right();
    table.getCell(list.length+2, 0).addContent(per);

    let summ = 0;
    for(let i = 0; i < list.length; i++) {
        summ += +list[i].tarifAndIncrease
    }

    console.log(summ);
    let text1 = new docx.TextRun(summ).bold().font('Liberation Serif');
    let per1 = new docx.Paragraph();
    per1.addRun(text1);
    table.getCell(list.length+2, 1).addContent(per1);

    let summArr = teachers.summ(teachersData);
    let midlePrice = +(summArr[7]/ summArr[3]).toFixed(2);
    let priceFond = +(summArr[7] + summ).toFixed(2);
    doc.addTable(table);

    func.printCentralParagraph('\n\n', doc); // empty line
    func.printCentralParagraph(' Середня педагогічна ставка –' + midlePrice, doc);
    func.printCentralParagraph(' Кількість педагогічних ставок за розрахунком годин – ' + summArr[3], doc);
    func.printCentralParagraph(' Фонд заробітної плати викладачів і концертмейстерів за місяць – ' + summArr[7], doc);
    func.printCentralParagraph(' Фонд оплати праці завідуючих відділами (відділеннями) за місяць - ' + summ, doc);
    func.printCentralParagraph(' Фонд доплат та надбавка за почесні, вчені звання та наукові ступені за місяць – ', doc);
    func.printCentralParagraph(' Фонд заробітної плати педагогічних працівників за місяць* - ' + priceFond, doc);
    func.printCentralParagraph('\n\n', doc); // empty line 
    func.printCentralParagraph(' В. о. директора ___________________________підпис', doc);
    func.printleftParagraph('МП', doc);
    func.printCentralParagraph('\n\n', doc); // empty line 
    func.printCentralParagraph(' Головний бухгалтер  ______________________підпис', doc);
    func.printCentralParagraph('\n\n', doc); // empty line 
    func.printleftParagraph(' *Фонд заробітної плати педагогічних працівників визначається шляхом множення середньої педагогічної ставки на кількість педагогічних ставок за розрахунком годин (Ф-16), до результату додається фонд оплати праці завідуючих відділами і сума доплат і надбавок за почесні, вчені звання та наукові ступені.', doc);
    func.printleftParagraph(' До тарифікаційного списку додаються:', doc);
    func.printTabParagraph('1. Наказ про затвердження обсягу педагогічного навантаження на поточний навчальний рік (погоджений з ПК)', doc);
    func.printTabParagraph('2. Розрахунок годин (Ф-16)', doc);
    func.printTabParagraph('3. Розрахунок середньої педагогічної ставки', doc);
    func.printCentralParagraph('\n\n', doc); // empty line
    func.printleftParagraph('Примітки:  - кількість педагогічних ставок по табелю (Ф-15) не повинна перевищувати визначеної розрахункам годин (Ф-16).', doc);
    func.printTabParagraph('• у графі 14 Тарифікаційного списку зазначаються: почесні, вчені звання та наукові ступені, зміни стажу роботи, що дає право на встановлення надбавки за вислугу років.', doc);

    const packer = new docx.Packer()

    packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync('../../../'+fileName + '.docx', buffer);
        fs.writeFileSync('fileDataBase/'+fileName + '.docx', buffer);
    });
}

exports.createDocMidleTarifPrice = (fileName) => {
    const doc = new docx.Document(undefined, {
        orientation: 'landscape'
    });

    const headerTitle = ['№', 'Прізвище, ім\'я та по батькові','Тижневе навантаження (у годинах)',
                         'Обсяг педагогічного навантаження', 
                        'Тарифна ставка з урахуваням підвищень', 'Зарплата', 
                        'Разом (зарплата +надбавки)', '20%', 'Всього'];
    
    const title = [ 'Викл', 'конц.', 'всього'];
    const summ = teachers.summ(teachersData);
    func.printCentralParagraph(' Розрахунок середньої ставки викладачів і концертмейстерів ', doc);
    func.printCentralParagraph('\n\n', doc); // empty line 
    func.printRightParagraph('Середня ставка: ' + (summ[7]/summ[3]).toFixed(2), doc);
    func.printRightParagraph('Станом на __________ 20__ року', doc);


    const table = new docx.Table(teachersData.length+4, headerTitle.length + 2);
    table.setWidth(docx.WidthType.PERCENTAGE, '100%');
    table.getRow(0).mergeCells(2, 4);
    table.getRow(1).mergeCells(0, 1);
    table.getRow(1).mergeCells(5, headerTitle.length + 2);
    
    for (let i = 0; i < headerTitle.length; i++) {
        func.printCellText(table, headerTitle[i], 0, i);
    }
    for (let i = 0; i < headerTitle.length + 2; i++) {
        func.printCellText(table, i+1, 2, i)
    }

     for (let i = 0; i < title.length; i++) {
        func.printCellText(table, title[i], 1, i+2)
    }
    
    for(let i = 3; i < teachersData.length+3; i++) {
        func.printCellText(table, i-2, i, 0);
    }

    func.printTable(table, 1, teachersData, 'fullName', 3); //2
    func.printTable(table, 2, teachersData, 'teachHours', 3); //3
    func.printTable(table, 3, teachersData, 'concertmasterHours', 3); //4
    func.printTable(table, 4, teachersData, 'loadTotal', 3); //5
    func.printTable(table, 5, teachersData, 'loadVolume', 3); //6
    func.printTable(table, 6, teachersData, 'mounthTarif', 3)
    func.printTable(table, 7, teachersData, 'salary', 3);
    func.printTable(table, 8, teachersData, 'inAll', 3);
    func.printTable(table, 9, teachersData, 'twentyPersent2', 3);
    func.printTable(table, 10, teachersData, 'total', 3);
    
    func.printCellText(table, 'Всього: ',teachersData.length +3, 1)
    func.printCellText(table, summ[2],teachersData.length +3, 4)
    func.printCellText(table, summ[3],teachersData.length +3, 5)
    func.printCellText(table, summ[8],teachersData.length +3, 6)
    func.printCellText(table, summ[4],teachersData.length +3, 7)
    func.printCellText(table, summ[5],teachersData.length +3, 8)
    func.printCellText(table, summ[6],teachersData.length +3, 9)
    func.printCellText(table, summ[7],teachersData.length +3, 10)


    doc.addTable(table);

    func.printCentralParagraph('\n\n', doc); // empty line 
    func.printleftParagraph('МП 	                         в.о. директора ___________________ підпис', doc);
    func.printCentralParagraph('\n\n', doc); // empty line 
    
    
    const packer = new docx.Packer()

    packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync('../../../'+fileName + '.docx', buffer);
        fs.writeFileSync('fileDataBase/'+fileName + '.docx', buffer);
    });
}

exports.createSummaryDataList = (fileName) => {
    const doc = new docx.Document(undefined, {
        orientation: 'landscape'
    });

    const headerList = ['#', 'Посада', 'Кількість штатних одиниць', 'Розряд',
    'Посадовий оклад', 'Вислуга', 'Надбавка та доплата',
    '20%', 'Фонд зарплати за місяць', 'Фонд зарплати на рік',
    'Оздоровчі', 'Щорічна винагорода', 'Разом'];

    const tableTitles = ['Всього по ДШМ', 'Фонд матеріального заохочення (3%)', 'Охорона праці (0,2%)','Всього фонд оплати праці за рік']
    const mat = summMaterList(0.03);
    const secure = summMaterList(0.002);


    func.printRightParagraph('«ЗАТВЕРДЖУЮ»', doc);
    func.printRightParagraph('Начальник відділу культури, туризму', doc);
    func.printRightParagraph('та культурної спадщини райдержадміністрації', doc);
    func.printRightParagraph('_______________', doc);
    func.printRightParagraph(' __________ 20__ р.', doc);
    func.printCentralParagraph('ЗВЕДЕНІ ДАНІ', doc); 
    func.printCentralParagraph('Про кількісний склад та фонд зарплати педагогічного, '
                            +'адмінуправлінчого та обслуговуючого персоналу по '
                            +'____________________ школі мистецтв на 20__-20__ навчальний рік.', doc); 
    func.printCentralParagraph('\n\n', doc); 

    const table = new docx.Table(propList.length+5, headerList.length);
    table.setWidth(docx.WidthType.PERCENTAGE, '100%');
    
    for (let i = 0; i < headerList.length; i++) {
        func.printCellText(table, headerList[i], 0, i);
    }

    for(let i = 0; i < propList.length; i++) {
        func.printCellText(table, i+1, i+1, 0);
    }
   
    func.printTable(table, 1, propList, 'position', 1); 
    func.printTable(table, 2, propList, 'staffUnitsAmounts', 1); 
    func.printTable(table, 3, propList, 'level', 1); 
    func.printTable(table, 4, propList, 'price', 1); 
    func.printTable(table, 5, propList, 'serviceYears', 1); 
    func.printTable(table, 6, propList, 'addPrice', 1); 
    func.printTable(table, 7, propList, 'twentyPercents', 1); 
    func.printTable(table, 8, propList, 'priceFondByMounth', 1); 
    func.printTable(table, 9, propList, 'priceFondByYear', 1); 
    func.printTable(table, 10, propList, 'serviceYears', 1); 
    func.printTable(table, 11, propList, 'serviceYears', 1); 
    func.printTable(table, 12, propList, 'summ', 1); 

 // column total-titles for summaryDataList 
    for (let i = 0; i < tableTitles.length; i++) {
    table.getRow(propList.length+i+1).mergeCells(0, 1);

        func.printCellText(table, tableTitles[i], propList.length+i+1, 0);
    }

// totalNambers
    func.ciclePrintCellText(1, summPropList.length, table, summPropList, propList.length+1, 1)
// material price
    func.ciclePrintCellText(1, mat.length, table, mat, propList.length+2, 1)

// secure price
    func.ciclePrintCellText(1, secure.length, table, secure, propList.length+3, 1)

//total of all total number
    let a = summPropList[11] + summMaterList(0.03)[11] + summMaterList(0.002)[11]
    func.printCellText(table, a, propList.length+4, 11)
                    //(table, text, row, col);

    doc.addTable(table);
    func.printleftParagraph('\n\n', doc)
    func.printleftParagraph('Разом по адмін.. управлінчому, обслуговуючому та педагогічному персоналу', doc);
    func.printleftParagraph('\n\n', doc)
    func.printRightParagraph('В. о. директора ____________________________', doc);
    func.printRightParagraph('Головний бухгалтер__________________________', doc);
       
    const packer = new docx.Packer()

    packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync('../../../'+fileName + '.docx', buffer);
        fs.writeFileSync('fileDataBase/'+fileName + '.docx', buffer);
    });
}


exports.createRepaireList = (fileName) => {
    const doc = new docx.Document(undefined, {
        orientation: 'portret'
    });
    headerList = ['#', 'Посада', 'Кількість штатних одиниць',
                    'Розряд', 'Посадовий оклад',
                    'Фонд зарплати за місяць', 'Фонд зарплати на рік'];

    func.printRightParagraph('«ЗАТВЕРДЖУЮ»', doc);
    func.printRightParagraph('Начальник відділу культури, туризму', doc);
    func.printRightParagraph('та культурної спадщини райдержадміністрації', doc);
    func.printRightParagraph('__________________', doc);
    func.printCentralParagraph('\n\n', doc); 
    func.printCentralParagraph('\n\n', doc); 
    func.printCentralParagraph('Штатний розпис', doc); 
    func.printCentralParagraph('Працівників по __________________ дитячій школі мистецтв станом на ___________ 20__ р.', doc); 
    func.printCentralParagraph('\n\n', doc); 

    let repaireData = [];
        for( let j = 0; j < propList.length; j++) {
            if (propList[j].position === 'repairer-installer') {
                repaireData.push(propList[j]);
            }}     
    // console.log(repaireData.length)
    const table = new docx.Table(2, headerList.length);
    table.setWidth(docx.WidthType.PERCENTAGE, '100%');

    for (let i = 0; i < headerList.length; i++) {
        func.printCellText(table, headerList[i], 0, i);
    }

    for(let i = 0; i < repaireData.length; i++) {
        func.printCellText(table, i+1, i+1, 0);
    }
    
    func.printTable(table, 1, repaireData, 'position', 1); 
    func.printTable(table, 2, repaireData, 'staffUnitsAmounts', 1); 
    func.printTable(table, 3, repaireData, 'level', 1); 
    func.printTable(table, 4, repaireData, 'price', 1); 
    func.printTable(table, 5, repaireData, 'priceFondByMounth', 1); 
    func.printTable(table, 6, repaireData, 'priceFondByYear', 1); 
    doc.addTable(table);

    const packer = new docx.Packer()

    packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync('../../../'+fileName + '.docx', buffer);
        fs.writeFileSync('fileDataBase/'+fileName + '.docx', buffer);
    });

    
}