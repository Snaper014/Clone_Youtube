require('dotenv').config();
const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./db/connectDb');

// Authentification
// jwt token
// mongoDB
// modal schema
// routes

// requetes de connexion et d'inscription
// middelware à chaque requete d'api avec jwt et token.

const app = express();
const port = 5000;

app
.use(morgan('dev'))
.use(BodyParser.json());
app.use(cors());
//middleware 

connectDB();

app.get("/", (req, res) => {
    const message = "Server Youtube";
    res.json({message, status: "My Man"})
})
app.get("/test", (req, res) => {
    const message = "Hello world";
    res.json({message, status: "test"})
})

let tab = [];
app.post("/history", (req, res) => {
    const body = req.body;
    const headers = req.headers.authorization;
    console.log("body", body);
    console.log("headers", headers);
    tab.push(body);
    res.json({auth: headers, response: body});  
})
app.get("/history", (req, res) => {
    res.json({tableau: tab})
})


app.delete("/history", (req, res) => {
    const TabSUp = tab[tab.length - 1];
    tab.pop();
    res.json({elementSup: TabSUp});
})

mongoose.connection.once('open', () => {
    console.log('Connexion à MongoDB');
    app.listen(port, () => console.log(`Notre application démarre sur le http://localhost:${port}`));
})

