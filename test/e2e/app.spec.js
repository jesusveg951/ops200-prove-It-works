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
})