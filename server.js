const express = require('express')
const mongoose = require('mongoose');
require("dotenv").config()

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const initserver = async () => {
    try {
        await mongoose.connect(process.env.DBURL);

        console.log ("Connesso al database.")

        app.listen(port, () => {
        console.log(`Il server sta ascoltando alla porta ${port}.`);
        });
    } catch (err) {
        console.error("Connessione al database fallita!", err);
    }
};

initserver();