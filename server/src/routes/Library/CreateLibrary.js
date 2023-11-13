const auth = require('../../auth/auth');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    app.post('/library', auth, async (req, res) => {
          const token = req?.headers?.authorization?.split(" ")[1];
          const decoded = jwt.decode(token);
          const {data} = req.body;
          const {email} = decoded; 
          const User = await Users.findOne({email});
          console.log("data", data);  
        try{
            if(!User){
                res.status(404).json({
                    reason: 'Utilisateur non trouver',
                    message: 'L\'utilisateur n\'a pas été trouver'
                })
                return;    
            }
            if(!data){
                res.status(400).json({
                    reason: 'La data non défini',
                    message: 'La data n\'est pas défini.'
                })
                return;    
            }
            User.Library.push(data);
            await User.save();
            res.json({message: "Playlist créer avec succès."})
            
        }catch(error){
            res.status(500).json({message: "error server"})
        }
    })
}