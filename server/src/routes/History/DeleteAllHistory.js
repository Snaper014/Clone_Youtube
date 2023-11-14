const auth = require('../../auth/auth');
const jwt = require('jsonwebtoken');
const Users = require('../../model/User');

module.exports = (app) => {
    app.delete('/all/History', auth, async (req, res) => {
        //const idVideo = req.params.id;
        const token = req?.headers?.authorization?.split(" ")[1];
          const decoded = jwt.decode(token);
          const {email} = decoded; 
          const existingUser = await Users.findOne({email});
        // commencer par la supression d'une vidéo
        // selection de plusiseurs vidéos
        try{
            if(!existingUser){
                res.status(404).json({
                    reason: 'Utilisateur non trouver',
                    message: 'L\'utilisateur n\'a pas été trouver'
                })
                return;    
            }   
            existingUser.historyVideos = [];
            await existingUser?.save();
            res.json({
                message: "Toutes les vidéos ont bien été suprimmeés",
                data: existingUser.historyVideos
            })
            return;
        }catch(error){
            res.json({message: "error server"})
        }
    })
}