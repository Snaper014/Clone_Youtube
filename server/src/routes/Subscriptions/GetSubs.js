const auth = require('../../auth/auth');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    app.get('/Subscriptions', auth, async (req, res) => {
          const token = req?.headers?.authorization?.split(" ")[1];
          const decoded = jwt.decode(token);
          const {email} = decoded; 
          const User = await Users.findOne({email}).select('-subscriptions._id');  
        try{
            if(!User){
                res.status(404).json({
                    reason: 'Utilisateur non trouver',
                    message: 'L\'utilisateur n\'a pas été trouver'
                })
                return;    
            }
            const data = User?.subscriptions?.reverse();
            res.json({ 
                message: 'Données récupérées avec succès.',
                data
                });
            
        }catch(error){
            res.status(500).json({message: "error server"})
        }
    })
}