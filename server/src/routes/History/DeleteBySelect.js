const auth = require('../../auth/auth');
const jwt = require('jsonwebtoken');
const Users = require('../../model/User');

module.exports = (app) => {
    app.delete('/History', auth, async (req, res) => {
        const data = req.body;
        const token = req?.headers?.authorization?.split(" ")[1];
          const decoded = jwt.decode(token);
          const {email} = decoded; 
          const existingUser = await Users.findOne({email});

        try{
            if(!existingUser){
                res.status(404).json({
                    reason: 'Utilisateur non trouver',
                    message: 'L\'utilisateur n\'a pas été trouver'
                })
                return;    
            }   
            if(!data || !Array.isArray(data)){
                res.status(400).json({
                    reason: "data undefined",
                    message: "Veuillez selectionner des vidéos pour les supprimer."
                })
               return; 
            }
            existingUser.historyVideos = existingUser.historyVideos.reverse().filter(
                (video) => !data.includes(video.idVideo)
            );
            await existingUser?.save();
            res.json({
                message: "les vidéos selectionner ont bien été suprimmeés",
                data: existingUser?.historyVideos
            })
            return;
        }catch(error){
            res.json({message: "error server"})
        }
    })
}