const auth = require('../../auth/auth');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    app.delete('/library/remove/:id', auth, async (req, res) => {
        const token = req.headers.authorization.split(" ")[1];
        const id = req.params.id
        const decoded = jwt.decode(token);
        const {email} = decoded; 
        const existingUser = await Users.findOne({email}); 

        try{
            const FilterPlaylist = existingUser.Library.filter(
                response => response?._id.toString() !== id
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
                    message: "L'id est indéfini ou manquant."
                })
               return; 
            }
            
            existingUser.Library = FilterPlaylist;
            await existingUser.save();
                res.json({ 
                    message: "La playlist a été supprimée avec succès.",
                    data: existingUser?.Library
                 });

        }catch(error){
            res.status(500).json({message: "error server"})
        }
    })
}