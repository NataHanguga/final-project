const fs = require('fs')
const docx = require('docx')
const teachersData = JSON.parse(fs.readFileSync('app/data/teachers.json', 'utf-8'))
const func = require('./tableGeneratorFunc');
const teachers = require('./teachers')

exports.createDocTarifList = () => {
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

    func.printTable(table, 1, teachersData, 'fullName');
    func.printTable(table, 2, teachersData, 'education');
    func.printTable(table, 3, teachersData, 'category');
    func.printTable(table, 3, teachersData, 'year');
    func.printTable(table, 4, teachersData, 'grade');
    func.printTable(table, 5, teachersData, 'price');
    func.printTable(table, 6, teachersData, 'pedagogicalTitle');
    func.printTable(table, 7, teachersData, 'increase');
    func.printTable(table, 8, teachersData, 'mounthTarif');
    func.printTable(table, 9, teachersData, 'experience');
    func.printTable(table, 10, teachersData, 'experiencePercent');
    func.printTable(table, 11, teachersData, 'premium');
    func.printTable(table, 12, teachersData, 'twentyPersent');
    func.printTable(table, 13, teachersData, 'mounthTarifTotal');

    for (let i = 2; i < teachersDataSize + 2; i++) {
        let num = new docx.TextRun(i - 1).font('Liberation Serif')
        let par = new docx.Paragraph();
        table.getCell(i, 0).addContent(par.addRun(num));
    }
    doc.addTable(table);


    const packer = new docx.Packer()

    packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("MyDoc.docx", buffer);
    });
}

exports.createDocManagerTarifList = () => {
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

    func.printTable(table, 1, list, 'fullName' );
    func.printTable(table, 2, list, 'department' );
    func.printTable(table, 3, list, 'salary' );
    func.printTable(table, 4, list, 'percent');
    func.printTable(table, 5, list, 'tarifAndIncrease' );
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
        fs.writeFileSync("MyDoc1.docx", buffer);
    });
}

exports.createDocMidleTarifPrice = () => {
    const doc = new docx.Document(undefined, {
        orientation: 'landscape'
    });

    const headerTitle = ['№', 'Прізвище, ім\'я та по батькові','Тижневе навантаження (у годинах)',
                         'Обсяг педагогічного навантаження (фактична кількість педагогічних годн)', 
                        'Тарифна ставка з урахуваням підвищень', 'Зарплата', 
                        'Разом (зарплата +надбавки)', 'Разом (зарплата +надбавки)', '20%', 'Всього'];
    
    const title = [ 'Викл', 'конц.', 'всього'];
    
    func.printCentralParagraph(' Розрахунок середньої ставки викладачів і концертмейстерів ', doc);
    func.printCentralParagraph('\n\n', doc); // empty line 

    const table = new docx.Table(teachersData.length, headerTitle.length + 2);
    table.setWidth(docx.WidthType.PERCENTAGE, '100%');

    table.getRow(0).mergeCells(2, 4);
    table.getRow(1).mergeCells(0, 1);
    table.getRow(1).mergeCells(5, headerTitle.length + 2);
    
    for (let i = 0; i < headerTitle.length; i++) {
        let par = new docx.Paragraph();
        let par1 = new docx.Paragraph();
        let num = new docx.TextRun(i + 1).font('Liberation Serif');
        let header = new docx.TextRun(headerTitle[i]).font('Liberation Serif');
        par1.addRun(num);
        par.addRun(header);
        table.getCell(0, i).addContent(par);
        table.getCell(2, i).addContent(par1);
    }

     for (let i = 0; i < title.length; i++) {
        let par = new docx.Paragraph();
        let header = new docx.TextRun(title[i]).font('Liberation Serif');
        par.addRun(header);
        table.getCell(1, i+2).addContent(par);
    }
    





    doc.addTable(table);

    func.printCentralParagraph('\n\n', doc); // empty line 
    func.printleftParagraph('МП 	                         в.о. директора ___________________ підпис', doc);
    func.printCentralParagraph('\n\n', doc); // empty line 
    
    
    const packer = new docx.Packer()

    packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync('MyDoc2.docx', buffer);
    });
}