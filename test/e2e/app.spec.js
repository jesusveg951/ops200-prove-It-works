const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
    let httpServer = null;
    let pageObject = null;

    before((done) => {
    httpServer = app.listen(8888);
    done();
    });

    beforeEach(() => {
    pageObject = nightmare.goto(url);
    });

    after((done) => {
    httpServer.close();
    done();
    });

    // This is where your code is going to go
    it('should correctly calculate mortgage', () =>
    pageObject
    .wait()
    .type('input[name=principal]', 300000)
    .type('input[name=interestRate]', 3.75)
    .type('input[name=loanTerm]', 30)
    .select('select[name=period]', 12)
    .click('button#calculate')
    .wait('#output')
    .evaluate(() => document.querySelector('#output').innerText)
    .then((outputText) => {
        expect(outputText).to.equal('$1389.346774716373');
    })
    ).timeout(6500);
})