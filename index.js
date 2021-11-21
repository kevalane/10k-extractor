// Imports
const fs = require('fs');
const dotenv = require('dotenv');
const PDFParser = require('pdf2json');
const express = require('express');

// Initializations
const app = express();
const pdfParser = new PDFParser();
dotenv.config();

// PDF Parser event handlers
pdfParser.on('pdfParser_dataError', err => console.error(err.parserError));
pdfParser.on('pdfParser_dataReady', data => console.log('Data is ready!'));

app.listen(process.env.PORT, () => {
    console.log('Hello world');
});

app.get('/what', (req, res) => {
    let rawData = fs.readFileSync('test.json');
    let data = JSON.parse(rawData);
    let magic = [];
    for (let i = 0; i < data['Pages'].length; i++) {
        for (let k = 0; k < data['Pages'][i]['Texts'].length; k++) {
            for (let m = 0; m < data['Pages'][i]['Texts'][k]['R'].length; m++) {
                if (data['Pages'][i]['Texts'][k]['R'][m]['T'].toLowerCase().includes('consolidated%20statements%20of%20operations')) {
                    // console.log(data['Pages'][i]['Texts'][k]['R'][m]['T']);
                    // console.log('i: ' + i + ' k: ' + k + ' m: ' + m);
                    magic[0] = i;
                    magic[1] = k;
                    magic[2] = m;
                }
            }
        }
    }
    // console.log(data['Pages'][magic[0]]['Texts'][magic[1]]['R'][magic[2]]['T'])
    // TODO: Find the page where financial statements are, then
    // TODO2: Loop over every single number, map it, and send back as reasonable data.
    console.log(decodeURIComponent(data['Pages'][33]['Texts'][1+14]['R'][0]['T']));
    res.status(200).send({msg: 'Hello World'});
})

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
    console.log(decodeURIComponent(data['Pages'][magicIndex[0]]['Texts'][magicIndex[1] + 20]['R'][magicIndex[2]]['T']))
    res.status(200).send(data);
})



fs.readFile('test.json', (data, err) => {
    console.log(data);
})


