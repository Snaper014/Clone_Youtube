const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //id déja générer par le back-end,
    username: {type: String, required: true},
    // token
    //history
    //Likes
    //Abonnements
    //Bibliothéques
    // comments (optionnel);
})