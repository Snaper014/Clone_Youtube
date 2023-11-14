const auth = require('../../auth/auth');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    app.post('/library/add', auth, async (req, res) => {
          const token = req?.headers?.authorization?.split(" ")[1];
          const decoded = jwt.decode(token);
          const {name, data} = req.body;
          const {email} = decoded; 
          const User = await Users.findOne({email});

        try{
            const existingPlaylist = User?.Library.find(Element => Element?.titlePlaylist === name);
            if(!User){
                res.status(404).json({
                    reason: 'Utilisateur non trouver',
                    message: 'L\'utilisateur n\'a pas été trouver'
                })
                return;    
            }
            if(!name){
                res.status(400).json({
                    reason: 'Le nom n\'est pas défini.',
                    message: 'Le nom n\'est pas défini pour l\'ajoutt de vidéos dans une playlist'
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
            if(!existingPlaylist){
                res.status(404).json({
                    reason: 'Playlist de nom non trouver',
                    message: 'La playlist n\'a pas pu etre trouver'
                })
                return;
            }
            const Checkdouble = existingPlaylist?.data.find(item => item?.title === data?.title);
            if(Checkdouble){
                return;
            } 
            existingPlaylist?.data.push(data);
            await User.save();
            res.json({message: "vidéo ajouter à la playlist avec succès"});
            
        }catch(error){
            res.status(500).json({message: "error server"})
        }
    })
}