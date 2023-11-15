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
    res.setHeader('content-type', 'text/html');
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
    res.setHeader('content-type', 'text/html');
    //console.log(list);
    res.write("<h1>Test wyswietlania listy rekordow spelniajace kryteria</h1>");
    //res.sendStatus(200);
    res.write("<table>");
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url +"<td>");
        res.write("<td>" + element.name + "</td>");
        res.write("<tr>");
    });
    res.write("</table>");
    db.close(client);
    res.end();
});

app.post('/add', async (req, res) => {
    let data = req.body;
    const client = await db.connect();
    const dbResponse = await db.add(client, data);
    if(dbResponse) {
        res.setHeader('content-type', 'text/html');
        res.write("<h1>Dodano rekord</h1>");
        
    } else {
        res.setHeader('content-type', 'text/html');
        res.write("<h1>Error podczas dodawania</h1>");
        
    }
    db.close(client);
    res.end();
});

app.listen(8000);