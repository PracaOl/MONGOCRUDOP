//test
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const db = require('./db');

app.get('/', async (req, res) => {
    res.send("dziala");
})

app.get('/listAll', async (req, res) => {
    //res.header("200");
    res.write("<h1>Test wyswietlania listy rekordow</h1>");
    const client = await db.connect();
    res.write("<table>");
    let list = await db.getAllListings(client);
    //list = list.toString();
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url +"<td>");
        res.write("<td>" + element.name + "</td>");
        res.write("<tr>");
    })
    res.write("</table>");
    db.close(client);
    res.end();
});
//POST
app.post('/search', async (req, res) => {
    //console.log(req.body);
    let criteria = req.body;
    const client = await db.connect();
    let list = await db.get(client, criteria);
    console.log(list);
    res.sendStatus(200);
});

app.listen(8000);