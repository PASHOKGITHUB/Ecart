//this middleware is use to handle the error while we posting the data.
//it will show error when we missed any of the key values.

module.exports=func=>(req,res,next)=>
    Promise.resolve(func(req,res,next)).catch(next) //here the catch will call the next middleware i.e) error.js
    //here Promise is a class and resolve is a function
