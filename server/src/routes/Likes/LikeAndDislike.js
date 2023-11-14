const auth = require('../../auth/auth');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    app.post('/likes', auth, async (req, res) => {
          const token = req?.headers?.authorization?.split(" ")[1];
          const decoded = jwt.decode(token);
          const type = req.query.type;
          const {data} = req.body;
          const {email} = decoded; 
          const existingUser = await Users.findOne({email});  
        try{
            const existingLikeIndex = existingUser?.likes.findIndex(
                response => response?.idVideo === data?.idVideo
            );
            if(!data || !data?.idVideo){
                 res.status(400).json({
                    reason: 'Bad Request',
                    message: 'La data n\'existe pas.'
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
            if(type === "like"){
                if(existingLikeIndex !== -1){
                    if(existingUser.likes[existingLikeIndex].typeLike === "dislike"){
                        existingUser.likes[existingLikeIndex].typeLike = "like";
                        await existingUser.save();
                        res.json({ 
                            message: "Vous avez remplacer le dislike par un like",
                            data: true
                            });
                      return;     
                    }
                    existingUser?.likes.splice(existingLikeIndex, 1);
                    await existingUser.save();
                    res.json({ 
                        message: "Vous avez enlever le like",
                        data: false
                     });
                    return;
                }else{
                    existingUser?.likes.push(data);
                }
    
                await existingUser.save();
                res.json({ message: 'Vous avez like la vidéo', data: true });
                return;
            }
            if(existingLikeIndex !== -1){
                if(existingUser.likes[existingLikeIndex].typeLike === "like"){
                    existingUser.likes[existingLikeIndex].typeLike = "dislike";
                    await existingUser.save();
                    res.json({ 
                        message: "Vous avez remplacer le like par un dislike",
                        data: true
                        });
                  return;     
                }
                existingUser?.likes.splice(existingLikeIndex, 1);
                await existingUser.save();
                res.json({ 
                    message: "Vous avez enlever le dislike",
                    data: false
                    });
                return;
            }else{
                existingUser?.likes.push(data);
            }

            await existingUser.save();
            res.json({ message: 'Vous avez dislike la vidéo', data: true });
        }catch(error){
            res.status(500).json({message: "error server"})
        }
    })
}