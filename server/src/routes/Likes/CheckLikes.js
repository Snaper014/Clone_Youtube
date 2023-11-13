const auth = require('../../auth/auth');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    app.get('/likes/check/:id', auth, async (req, res) => {
          const token = req?.headers?.authorization?.split(" ")[1];
          const decoded = jwt.decode(token);
          const id = req.params.id;
          const {email} = decoded; 
          const existingUser = await Users.findOne({email});  
          try{
            const existingLikeIndex = existingUser?.likes.findIndex(
                response => response?.idVideo === id
            );
            if(!id){
                 res.status(400).json({
                    reason: 'Bad Request',
                    message: 'L\'id n\'existe pas.'
                })
                return;
            }
            if(!existingUser){
                res.status(404).json({
                    reason: 'Utilisateur non trouver',
                    message: 'L\'utilisateur n\'a pas été trouver'
                })
                return;
            }
            if(existingLikeIndex !== -1){
                const type = existingUser.likes[existingLikeIndex].typeLike;
                res.json({ 
                    message: "Vous avez enlever le dislike",
                    data: type
                    });
                return;
            }
            res.json({ message: 'vidéo non trouver', data: 'no found' });   
        }catch(error){
            res.status(500).json({message: "error server"})
        }
    })
}