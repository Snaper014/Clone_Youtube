const auth = require('../../auth/auth');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    app.delete('/Subscriptions/:id', auth, async (req, res) => {
          const id = req.params.id;
        const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.decode(token);
          const {email} = decoded 
          const existingUser = await Users.findOne({email}); 
        try{
            const VideoIndex = existingUser?.subscriptions.findIndex(
                response => response?.channelId === id
            );
            if(!existingUser){
                res.status(404).json({
                    reason: 'Utilisateur non trouver',
                    message: 'L\'utilisateur n\'a pas été trouver'
                })
                return;    
            }
            if(!id){
                res.status(400).json({
                    reason: "id undefined",
                    message: "l'id pour supprimer la vidéo est obligatoire"
                })
               return; 
            }
            if(VideoIndex !== -1){
                existingUser?.subscriptions.splice(VideoIndex, 1);
                await existingUser.save();
                res.json({ 
                    message: "La vidéo a été suprimmée. avec succès.",
                    data: existingUser?.subscriptions.reverse()
                 });
                return;
            }
            res.json({message: "la vidéo n'a pas été trouvée"})
            
        }catch(error){
            res.status(500).json({message: "error server"})
        }
    })
}