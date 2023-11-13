const auth = require('../../auth/auth');
const User = require('../../model/User');


module.exports = (app) => {
    app.post('/History', auth, async (req, res) => {
        const {id, data} = req.body;
        console.log("id", id);
        console.log("data", data)

        const existingUser = await User.findById(id);
        try{
            const existingVideoIndex = existingUser?.historyVideos.findIndex(
                history => history?.idVideo === data?.idVideo
            );
            
            if(!id || !data?.miniature || !data?.idVideo || !data){
                console.log('bad request');
                 res.status(400).json({
                    reason: 'Bad Request',
                    message: 'L\'ID de l\'utilisateur et l\'ID de la vidéo sont requis.'
                })
                return;
            }
            
            if(existingVideoIndex !== -1){
                console.log('good request existingVideoIndex');
                existingUser.historyVideos[existingVideoIndex].updated = 
                new Date().toLocaleString('fr-FR', {timeZone: 'UTC'});
            }else{
                console.log('good request Autre');
                existingUser.historyVideos.push(data);
            }
            await existingUser.save();
            res.json({ message: 'Données mises à jour avec succès.' });
            
        }catch(error){
           return res.status(500).json({message: "error server"});
        }
    })
}