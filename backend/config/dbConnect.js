const mongoose = require('mongoose');



//function to connect
const dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,  { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB connected Succes')
    } catch(error){
        console.log(error.message);
        process.exit(1);
    }
}


dbConnect()