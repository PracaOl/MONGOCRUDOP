const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:25duK7Z6Le@test.ctydk3t.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return client;
        } catch (e) {
            console.log("Error connecting to Database: " + e);
            process.exit(1);

        }
}

module.exports = {connect}