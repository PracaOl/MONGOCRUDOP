//test
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
    res.send("dziala");
})

app.get('/listAll', async (req, res) => {
    //res.header("200");
    res.write("<h1>Test wyswietlania listy rekordow</h1>");
    res.end();
})

app.listen(8000);