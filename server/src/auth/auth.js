require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
        try{
            if(!token) {
                const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
                return res.status(401).json({ message })
              }
              const decodedToken = jwt.verify(token, process.env.KEY_JWT_TOKEN, (error, decodedToken) => {
                if(error) {
                  const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
                  return res.status(401).json({ message, data: error })
                }
              
                const userId = decodedToken.userId
                if (req.body.userId !== userId) {
                  const message = `L'identifiant de l'utilisateur est invalide.`
                  res.status(401).json({ message })
                } else {
                  next()
                }
              })
               
        }catch(error){
            console.log(error)
        }
}