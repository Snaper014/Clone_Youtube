const auth = require('../../auth/auth');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    app.delete('/library', auth, async (req, res) => {
        const token = req.headers.authorization.split(" ")[1];
        const {idPlaylist, idVideo} = req.body;
        const decoded = jwt.decode(token);
        const {email} = decoded 
        const existingUser = await Users.findOne({email}); 

        try{
            const VideoIndex = existingUser.Library.findIndex(
                response => response?._id.toString() === idPlaylist
            );
            if(!existingUser){
                res.status(404).json({
                    reason: 'Utilisateur non trouver',
                    message: 'L\'utilisateur n\'a pas été trouver'
                })
                return;    
            }
            if(!idPlaylist || !idVideo){
                res.status(400).json({
                    reason: "id undefined",
                    message: "Un des id est indéfini ou manquants."
                })
               return; 
            }
            if(VideoIndex !== -1){
                existingUser.Library[VideoIndex].data = existingUser.Library[VideoIndex].data.filter(
                    (item) => item?._id.toString() !== idVideo
                );            
                await existingUser.save();
                res.json({ 
                    message: "La vidéo a été suprimmée. avec succès.",
                    data: existingUser?.Library[VideoIndex]
                 });
                return;
            }

            res.json({message: "la vidéo n'a pas etre supprimer."})
        }catch(error){
            res.status(500).json({message: "error server"})
        }
    })
}