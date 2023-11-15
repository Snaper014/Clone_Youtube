require('dotenv').config();
const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./src/db/connectDb');


const app = express(); 

app
.use(morgan('dev'))
.use(cors({
    origin: ['https://clone-youtube-liard.vercel.app', 'http://localhost:3000'],
    methods: ['GET','POST','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
.use(BodyParser.json());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "https://example.com");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     next();
//   })

connectDB();


require('./src/routes/signIn')(app);
require('./src/routes/signUp')(app);
require('./src/routes/History/AddVideosHistory')(app);
require('./src/routes/History/GetVideosHistory')(app);
require('./src/routes/History/DeleteById')(app);
require('./src/routes/History/DeleteBySelect')(app);
require('./src/routes/History/DeleteAllHistory')(app);
require('./src/routes/Subscriptions/AddSubs')(app);
require('./src/routes/Subscriptions/CheckSubs')(app);
require('./src/routes/Subscriptions/DeleteSubs')(app);
require('./src/routes/Subscriptions/GetSubs')(app);
require('./src/routes/Likes/LikeAndDislike')(app);
require('./src/routes/Likes/GetLikes')(app);
require('./src/routes/Likes/CheckLikes')(app);
require('./src/routes/Library/GetLibrary')(app);
require('./src/routes/Library/CreateLibrary')(app);
require('./src/routes/Library/AddVideoInLibrary')(app);
require('./src/routes/Library/DeleteVideoInLibrary')(app);
require('./src/routes/Library/RemoveLibrary')(app);


app.get("/", (req, res) => {
    const message = "Server Youtube Clone";
    res.json({message, status: "success"})
})


mongoose.connection.once('open', () => {
    console.log('Connexion à MongoDB');
    //app.listen(port, () => console.log(`Notre application démarre sur le http://localhost:${port}`));
})

module.exports = app;
