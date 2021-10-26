// Imports
const fs = require('fs'),
PDFParser = require('pdf2json');

const pdfParser = new PDFParser();

pdfParser.on('pdfParser_dataError', err => console.error(err.parserError));
pdfParser.on('pdfParser_dataReady', data => {
    // console.log(data);
    console.log(data['Pages'][0]['Texts'][0]['R'][0]['T']);
    // fs.writeFile("test.json", JSON.stringify(pdfData));
});

pdfParser.loadPDF('test.pdf');


