require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = async () => {
        try{
            await mongoose.connect(process.env.DATABASE_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
              });
        }catch (err){
            console.log(err);
        }
}

module.exports = connectDb;