const ml = require('ml-regression');
const csv = require('csvtojson');
const readline = require('readline');

const csvFilePath = 'Advertising.csv';
const SLR = ml.SLR; // simple linear regression
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let csvData = [];
let X = []; // input
let y = []; // output

let regressionModel;

csv().fromFile(csvFilePath).on('json', (jsonObj) => csvData.push(jsonObj)).on('done', () => {
    dressData();
    preformRegression();
});

function dressData() {
    csvData.forEach((row) => {
        X.push(parseFloat(row.Radio));
        y.push(parseFloat(row.Sales));
    })
}

function preformRegression() {
    regressionModel = new SLR(X, y);
    console.log(regressionModel.toString(3));
    predictOutput();
}

function predictOutput() {
    rl.question('Input X for prediction: ', (answer) => {
        console.log(`At X = ${answer}, y = ${regressionModel.predict(parseFloat(answer))}`);
        predictOutput();
    });
}