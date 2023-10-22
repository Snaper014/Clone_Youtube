const express = require("express");
const morgan = require("morgan");
const BodyParser = require('body-parser');


const app = express();
const port = 5000;

app
.use(morgan('dev'))
.use(BodyParser.json());

//middleware 

app.get("/test", (res, req) => {
    const message = "Hello world";
    res.send({message, status: "test"})
})

app.listen(port, () => console.log(`Notre application démarre sur le http://localhost:${port}`));
