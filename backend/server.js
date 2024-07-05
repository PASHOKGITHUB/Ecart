const app=require('./app')
const dotenv=require('dotenv')
const path=require('path')
const connectDatabase = require('./config/database')



dotenv.config({path:path.join(__dirname,"config/config.env")})//this will connect the config and dotenv. 

connectDatabase()

const server =app.listen(process.env.PORT,()=>{
    console.log(`server listen to the port ${process.env.PORT} in ${process.env.NODE_ENV}`);
})

//unhandled exception, works at missing catch and db connection string error
process.on('unhandledRejection', (err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error')
    server.close(()=>{
        process.exit(1);
    })
})

//Uncaught exception
process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaughtException error')
    server.close(()=>{
        process.exit(1);
    })
})

//console.log(a);


