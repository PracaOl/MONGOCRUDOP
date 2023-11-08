//test
const express = require('express');
const app = express();
const db = require('./db');

app.get('/', async (req, res) => {
    res.send("dziala");
})

app.get('/listAll', async (req, res) => {
    //res.header("200");
    res.write("<h1>Test wyswietlania listy rekordow</h1>");
    const client = await db.connect();
    let list = await db.getAllListings(client);
    list = list.toString();
    res.write(list);
    db.close(client);
    res.end();
})

app.listen(8000);