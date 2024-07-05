module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500

    // res.status(err.statusCode).json({
    //     success:false,
    //     message:err.message,
    //     stack:err.stack
    // })
    if(process.env.NODE_ENV=="development"){
        res.status(err.statusCode).json({
            success:false,
            message:err.message,
            stack:err.stack,
            error:err
        })
    }

    if(process.env.NODE_ENV=="production"){
        let message=err.message
        let error=new Error(message)
        //use to find out the validation error that is specified in the schema design
        if(err.name=="ValidationError"){
            message=Object.values(err.errors).map(value=>value.message)
            error=new Error(message)
        }

        //error handling for cast error
        if(err.name=="cast"){
            message=`Resource not Found ${err.path}`
            error=new Error(message)
        }

        res.status(err.statusCode).json({
            success:false,
            message:error.message|| 'Internal Server Error'

        })
    }

}