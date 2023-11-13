require('dotenv').config();
const Users = require('../model/User');
const jwt = require('jsonwebtoken');
const bycrpt = require('bcryptjs');

module.exports = (app) => {
    app.post("/sign-in", async (req, res) => {
        const {username, password} = req.body;
        const existingUser = await Users.findOne({email: username});

    try{
           if(!existingUser){
                res.status(404).json({
                   reason: "No existingUser",
                   message: "Le nom d'utilisateur ou l'email n'existe pas"
               })
              return; 
           }
        const isPasswordCorrect = bycrpt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            res.status(400).json({
                reason: 'passwordIncorrect',
                message: "le mot de passe indiquer n'est pas le bon, Veuillez Réessayez."
            })
            return;
        }
        const token = jwt.sign(
            {
            email: existingUser.email, 
            username: existingUser.username, 
            id: existingUser._id,
            color: existingUser.color
        },
            process.env.KEY_JWT_TOKEN,
            {expiresIn: '1h'}
            )
        res.json({result: 'User valider', token});    
           //cas google aprés
        }catch(error){
            res.status(500).json({message: "Error server"})  
        }
})
}