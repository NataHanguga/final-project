const docx = require('docx')

exports.printRightText = (arr, doc) => {
    let text;
    let paragraph;
    for (let i = 0; i < arr.length; i++) {
        text = new docx.TextRun(arr[i]).font('Liberation Serif');
        paragraph = new docx.Paragraph();
        paragraph.addRun(text).right();
    
        doc.addParagraph(paragraph);
    }
}

exports.printCentralText = (arr, doc) => {
    let text;
    let paragraph;
    for (let i = 0; i < arr.length; i++) {
        text = new docx.TextRun(arr[i]).font('Liberation Serif');
        paragraph = new docx.Paragraph();
        paragraph.addRun(text).center();
        doc.addParagraph(paragraph);
    }
}

exports.printCellTeacherData = (size, obj, atr) => {
    for (let i = 1; i < size+1; i++) {
        let teachfullNameText = new docx.TextRun(obj[i][atr]).font('Liberation Serif')
        let par = new docx.Paragraph();
        // console.log(obj[i][atr]);
        return par.addRun(teachfullNameText);
    }
}

const ParamArray = (obj, atr) => {
    let arr = [];
    for (let i = 0; i < obj.length; i++){
        arr.push(obj[i][atr]);
    }
    return arr;
}; 

exports.printTable = (table, index, obj, atr, step) => {
    for( let i = step; i < obj.length+step; i++) {
        let par = new docx.Paragraph();
        let text = new docx.TextRun(ParamArray(obj, atr)[i-step]).font('Liberation Serif')
        table.getCell(i, index).addContent(par.addRun(text));
    }
}

exports.printCentralParagraph = (par, doc) => {
    let text = new docx.TextRun(par).font('Liberation Serif');
    let paragraph = new docx.Paragraph();
    paragraph.addRun(text).center();
    doc.addParagraph(paragraph);
}

exports.printleftParagraph = (par, doc) => {
    let text = new docx.TextRun(par).font('Liberation Serif');
    let paragraph = new docx.Paragraph();
    paragraph.addRun(text);
    doc.addParagraph(paragraph);
}

exports.printRightParagraph = (par, doc) => {
    let text = new docx.TextRun(par).font('Liberation Serif');
    let paragraph = new docx.Paragraph();
    paragraph.addRun(text).right();
    doc.addParagraph(paragraph);
}

exports.printTabParagraph = (par, doc) => {
    let text = new docx.TextRun(par).font('Liberation Serif').tab();
    let paragraph = new docx.Paragraph();
    paragraph.addRun(text);
    doc.addParagraph(paragraph);
}

exports.getArrayByParam = (obj, atr, val) => {
    const list = [];
    const arr = [];
        for( let i=0;i<obj.length;i++) 
            if (obj[i][atr] === val)
                arr.push(i);
    
        for (let i = 0; i < arr.length; i++ ) 
            list.push(obj[arr[i]]);
        
        return list;
}

exports.printCellText = (table, text, i, j) => {
    let data = new docx.TextRun(text).font('Liberation Serif');
    let parag = new docx.Paragraph();
    table.getCell(i, j).addContent(parag.addRun(data));
}

exports.ciclePrintCellText = (start, size, table, obj, i, step) => {
    for (let idx = start; idx <= size; idx++) {
        let data = new docx.TextRun(obj[idx-1]).font('Liberation Serif');
        let parag = new docx.Paragraph();
        if (step === 0) {
            table.getCell(i, idx).addContent(parag.addRun(data))
        } else {
            table.getCell(i, idx-step).addContent(parag.addRun(data))

        }

    }
}