const express = require("express");
const morgan = require("morgan");
const BodyParser = require('body-parser');

// Authentification
// jwt token
// mongoDB
// modal schema
// routes

const app = express();
const port = 5000;

app
.use(morgan('dev'))
.use(BodyParser.json());

//middleware 

app.get("/", (req, res) => {
    const message = "Server Youtube";
    res.json({message, status: "My Man"})
})
app.get("/test", (req, res) => {
    const message = "Hello world";
    res.json({message, status: "test"})
})

app.listen(port, () => console.log(`Notre application démarre sur le http://localhost:${port}`));
