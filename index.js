// Imports
const fs = require('fs');
const dotenv = require('dotenv');
const PDFParser = require('pdf2json');
const pdfParser = new PDFParser();
const express = require('express');
const app = express();

app.listen(process.env.PORT, () => {
    console.log('Hello world');
});

app.get('/test', (req, res) => {
    // pdfParser.loadPDF('test.pdf');
    let rawData = fs.readFileSync('test.json');
    let data = JSON.parse(rawData);

    let loops = 0;
    let magicIndex = [0,0,0];
    // Let's loop for 'selected%20financial%20data, occurence 2'
    for (let i = 0; i < data['Pages'].length; i++) {
        for (let k = 0; k < data['Pages'][i]['Texts'].length; k++) {
            for (let m = 0; m < data['Pages'][i]['Texts'][k]['R'].length; m++) {
                if (data['Pages'][i]['Texts'][k]['R'][m]['T'].toLowerCase().includes('selected%20financial%20data')) {
                    loops++;
                    if (loops == 2) {
                        // console.log(data['Pages'][i]['Texts'][k]['R'][m]['T']);
                        magicIndex[0] = i;
                        magicIndex[1] = k;
                        magicIndex[2] = m;
                    }  
                }
            }
        }
    }
    // console.log(magicIndex);
    // console.log(data['Pages'][magicIndex[0]]['Texts'][magicIndex[1] + 20]['R'][magicIndex[2]]['T']);
    console.log(decodeURIComponent(data['Pages'][magicIndex[0]]['Texts'][magicIndex[1] + 20]['R'][magicIndex[2]]['T']))
    res.status(200).send(data);
})

pdfParser.on('pdfParser_dataError', err => console.error(err.parserError));
pdfParser.on('pdfParser_dataReady', data => {
    // console.log(data);
    // console.log(data['Pages'][0]['Texts'][0]['R'][0]['T']);
    
    // fs.writeFile('test.json', data, () => {});
});



fs.readFile('test.json', (data, err) => {
    console.log(data);
})


