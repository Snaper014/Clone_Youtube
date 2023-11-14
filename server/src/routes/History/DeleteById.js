const auth = require('../../auth/auth');
const jwt = require('jsonwebtoken');
const Users = require('../../model/User');

module.exports = (app) => {
    app.delete('/History/:id', auth, async (req, res) => {
        const id = req.params.id;
        const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.decode(token);
          const {email} = decoded 
          const existingUser = await Users.findOne({email});
          
        try{
            const VideoIndex = existingUser?.historyVideos.findIndex(
                history => history?.idVideo === id
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
                existingUser?.historyVideos.splice(VideoIndex, 1);
                await existingUser.save();
                res.json({ 
                    message: "La vidéo a été suprimmée. avec succès.",
                    data: existingUser?.historyVideos.reverse()
                 });
                return;
            }

            res.json({message: "la vidéo n'a pas été suprimmée."})
            
        }catch(error){
            res.json({message: "error server"})
        }
    })
}