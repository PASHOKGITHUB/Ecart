const mongoose=require('mongoose')

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true //both the lines are use to mention that we are using the current version
    }).then(con=>{
        console.log(`MongoDB connected to the host:${con.connection.host}`);
    })
}

module.exports=connectDatabase;