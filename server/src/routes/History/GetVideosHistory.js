const auth = require('../../auth/auth');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    app.get('/History', auth, async (req, res) => {
          const token = req?.headers?.authorization?.split(" ")[1];
          const search = req?.query?.search;
          const decoded = jwt.decode(token);
          const {email} = decoded 
          const User = await Users.findOne({email}).select('-historyVideos._id');  
        try{
            if(!User){
                res.status(404).json({
                    reason: 'Utilisateur non trouver',
                    message: 'L\'utilisateur n\'a pas été trouver'
                })
                return;    
            }
            if(search){
                if(search?.length < 3){
                    res.status(401).json({
                        reason: 'bad search', 
                        message: "Veuillez effectuez une recherche plus précise. La recherche exige au moins 3 caractères au minimum",
                     });
                }else{
                    const match = search.toLocaleLowerCase();
                    const Regex = new RegExp(match);
                    const data = User?.historyVideos?.filter(items => 
                        Regex.test(items?.title?.toLocaleLowerCase()))
                    res.json({ 
                        message: 'Données filtrer avec succès.',
                        data
                     });
                }
               return; 
            }
                const data = User?.historyVideos?.reverse();
                res.json({ 
                    message: 'Données récupérées avec succès.',
                    data
                 });

        }catch(error){
            res.status(500).json({message: "error server"})
        }
    })
}