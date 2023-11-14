const auth = require('../../auth/auth');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    app.get('/Subscriptions/check/:id', auth, async (req, res) => {
          const token = req?.headers?.authorization?.split(" ")[1];
          const id = req.params.id;
          const decoded = jwt.decode(token);
          const {email} = decoded; 
          const existingUser = await Users.findOne({email});  

        try{
            if(!id){
                 res.status(400).json({
                    reason: 'Bad Request',
                    message: 'L\'ID de l\'utilisateur et l\'ID de la vidéo sont requis.'
                })
                return;
            }
            if(!existingUser){
                res.status(404).json({
                    reason: 'Utilisateur non trouver',
                    message: 'L\'utilisateur n\'a pas été trouver'
                })
                return;    
            }
            const check = existingUser?.subscriptions.some(response => response?.channelId === id);
            res.json({ 
                message: 'Données vérifiées',
                data: check 
            });
            
        }catch(error){
            res.status(500).json({message: "error server"})
        }
    })
}