const auth = require('../../auth/auth');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    app.post('/Subscriptions', auth, async (req, res) => {
          const token = req?.headers?.authorization?.split(" ")[1];
          const decoded = jwt.decode(token);
          const {data} = req.body;
          const {email} = decoded; 
          const existingUser = await Users.findOne({email}); 

        try{
            const existingVideoIndex = existingUser?.subscriptions.findIndex(
                response => response?.channelId === data?.channelId
            );
            if(!existingUser){
                res.status(404).json({
                    reason: 'Utilisateur non trouver',
                    message: 'L\'utilisateur n\'a pas été trouver'
                })
                return;
            }
            
            if(!data || !data?.channelId){
                 res.status(400).json({
                    reason: 'Bad Request',
                    message: 'La data n\'existe pas.'
                })
                return;
            }
            if(existingVideoIndex !== -1){
                existingUser?.subscriptions.splice(existingVideoIndex, 1);
                await existingUser.save();
                res.json({ 
                    message: "Vous vous etes desabonner",
                    data: false
                 });
                return;
            }else{
                existingUser?.subscriptions.push(data);
            }

            await existingUser.save();
            res.json({ message: 'Nouvelle abonnée', data: true });
        }catch(error){
            res.status(500).json({message: "error server"})
        }
    })
}