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

async function getAllListings(client) {
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    let list = collection.find().toArray();
    return list;
}

function close(client) {
    client.close();
    console.log("Successfully disconnected from MongoDB");
}


module.exports = {connect, getAllListings, close}