const sendToken=async(user,statuscode,res)=>{

    //creating jwt token
    const token=user.getJwtToken()

    //setting cookies
    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true
    }

    res.status(statuscode)
    .cookie('token',token,options) //('key',value,options)
    .json({
        success:true, 
        user,
        token
    })
}

module.exports=sendToken 