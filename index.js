// Imports
const fs = require('fs'),
PDFParser = require('pdf2json');

const pdfParser = new PDFParser();

pdfParser.on('pdfParser_dataError', err => console.error(err.parserError));
pdfParser.on('pdfParser_dataReady', data => {
    // console.log(data);
    // console.log(data['Pages'][0]['Texts'][0]['R'][0]['T']);
    // fs.writeFile("test.json", JSON.stringify(pdfData));
    // for (let i = 0; i < data['Pages'].length; i++) {
    //     console.log(i)
    //     console.log(data['Pages'][i]['Texts'].length);
    //     console.log(data['Pages'][i]['Texts'][0]['R'][0]['T']);
        // for (let k = 0; k < data['Pages'][i]['Texts'].length; k++) {
        //     if (i == data['Pages'].length) {
        //         console.log(k);
        //     }
        // }
    // }
    fs.writeFile('test.json', data, () => {

    });
});

pdfParser.loadPDF('test.pdf');


