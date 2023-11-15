require('dotenv').config();
const Users = require('../model/User');
const jwt = require('jsonwebtoken');
const bycrpt = require('bcryptjs');

module.exports = (app) => {
    app.post("/sign-in", async (req, res) => {
        const {username, password} = req.body;
        const isEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/g;
        let existingUser;

      if(isEmail.test(username)){
            existingUser = await Users.findOne({email: username});
      }else{
        existingUser = await Users.findOne({username: username});
      }  

    try{
           if(!existingUser){
                res.status(404).json({
                   reason: "No existingUser",
                   message: "Le nom d'utilisateur ou l'email n'existe pas"
               })
              return; 
           }
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
        
        }catch(error){
            res.status(500).json({message: "Error server"})  
        }
})
}