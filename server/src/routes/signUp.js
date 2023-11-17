require('dotenv').config();
const Users = require('../model/User');
const bycrpt = require('bcryptjs');
const Colors = require('../utils/LogoColors');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.post("/sign-up", async (req, res) => {
        const RegexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/g;
        const RegexEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/g;
        const RegexUsername = /^[0-9a-zA-Z]{5,}$/g;
        const color = Colors[Math.floor(Math.random() * Colors?.length)]
        const {username, email, password, confirmpassword, image, AuthByGoogle} = req.body;
        const picture_profil = image ? image : '';
     try{
        if(AuthByGoogle){
            const existingUser = await Users.findOne({email});
            if(existingUser){
                bycrpt.compare(password, existingUser.password)
                .then(response => {
                    const isPasswordCorrect = response;
                    console.log("response", response);
                    if(!isPasswordCorrect){
                       return res.status(400).json({
                            reason: 'passwordIncorrect',
                            message: "le mot de passe indiquer n'est pas le bon, Veuillez Réessayez."
                        })
                        
                    }
                    const token = jwt.sign(
                        {
                        email: existingUser.email, 
                        username: existingUser.username, 
                        id: existingUser._id,
                        color: existingUser.color,
                        image: existingUser.image
                    },
                        process.env.KEY_JWT_TOKEN,
                        {expiresIn: '12h'}
                        )
                   return res.json({result: 'User valider', token}); 
                })
                .catch(error => console.log("error", error))
                
            }
            const hashedPassword = await bycrpt.hash(password, 12);
            const result = await Users.create({username, email, password: hashedPassword, color: color, image: picture_profil});

            const token = jwt.sign(
            {
                email: result.email, 
                username: result.username, 
                id: result._id,
                color: result.color,
                image: result.image
            },
                process.env.KEY_JWT_TOKEN,
                {expiresIn: '12h'}
                )
           return res.json({result: 'User valider', token});
        }else{

        if(!RegexUsername.test(username)){
          return res.status(401).json({
                reason: 'username' , 
                message: 'le nom d\'utilisateur doit contenir au minimum 5 caratères contenant exclusivement des chiffres et lettres.'
        })
        }
        if(!RegexEmail.test(email)){
           return res.status(401).json({
                reason: 'email non valide',
                message: 'Veuillez saisir une adresse email valide' 
        })
        }   
        if(!RegexPassword.test(password)){
           return res.status(401).json({
                reason: 'password',
                message: "Le mot de passe doit contenir au minimum 8 caratères dont 1 lettre miniscule, 1 lettre majscule et un chiffre."
            })
        }    
        if(password !== confirmpassword){
           return res.status(401).json({
                reason: 'confirmpassword', 
                message: 'La confirmation du mot de passe ne correspond pas au mot de passe'
            });
        }
        const existingName = await Users.findOne({username});
            if(existingName){
              return res.status(400).json({
                   reason: "existingName",
                   message: `Le nom d'utilisateur ${username} est déjà pris.`
               })
        }
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return res.status(400).json({
                reason: "existingUser",
                message: `L\'utilisateur ${email} est déjà existant.`
            })
        }
        const hashedPassword = await bycrpt.hash(password, 12);
        const result = await Users.create({username, email, password: hashedPassword, color: color, image: picture_profil});

        const token = jwt.sign(
        {
            email: result.email, 
            username: result.username, 
            id: result._id,
            color: result.color,
            image: result.image
        },
            process.env.KEY_JWT_TOKEN,
            {expiresIn: '12h'}
            )
         return res.json({result: 'User valider', token}) 
      }  // cas google aprés 
     }catch(error){
         res.status(500).json({message: "Error server"})   
     }
})
}
