require('dotenv').config();
const Users = require('../model/User');
const bycrpt = require('bcryptjs');
const Colors = require('../utils/LogoColors');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.post("/sign-up", async (req, res) => {
        const RegexPassword = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/g;
        const RegexEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/g;
        const RegexUsername = /[0-9a-zA-Z]{5,}/g;
        const color = Colors[Math.floor(Math.random() * Colors?.length)]
        const {username, email, password, confirmpassword} = req.body;
     try{
        if(!RegexUsername.test(username)){
            res.status(401).json({
                reason: 'username' , 
                message: 'le nom d\'utilisateur doit contenir au minimum 5 caratères contenant exclusivement des chiffres et lettres.'
        })
            return;
        }
        if(!RegexEmail.test(email)){
            res.status(401).json({
                reason: 'email non valide',
                message: 'Veuillez saisir une adresse email valide' 
        })
            return;
        }   
        if(!RegexPassword.test(password)){
            res.status(401).json({
                reason: 'password',
                message: "Le mot de passe doit contenir au minimum 1 lettre miniscule, 1 lettre majscule et au moins 8 caratères"
            })
            return;
        }    
        if(password !== confirmpassword){
            res.status(401).json({
                reason: 'confirmpassword', 
                message: 'La confirmation du mot de passe ne correspond pas au mot de passe'
            });
            return;
        }
        const existingName = await Users.findOne({username});
            if(existingName){
                res.status(400).json({
                   reason: "existingName",
                   message: "Le nom d'utilisateur est déjà pris."
               })
              return;
        }
        const existingUser = await Users.findOne({email});
        if(existingUser){
             res.status(400).json({
                reason: "existingUser",
                message: "L'utilisateur est déjà existant."
            })
           return; 
        }
        const hashedPassword = await bycrpt.hash(password, 12);
        const result = await Users.create({username, email, password: hashedPassword, color: color});

        const token = jwt.sign(
        {
            email: result.email, 
            username: result.username, 
            id: result._id,
            color: result.color
        },
            process.env.KEY_JWT_TOKEN,
            {expiresIn: '1h'}
            )
         res.json({result: 'User valider', token})   
        // cas google aprés  
     }catch(error){
         res.status(500).json({message: "Error server"})   
     }
})
}