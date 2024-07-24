const express= require('express')
const errorMiddleware=require('./middleware/error')
const cookieParser=require('cookie-parser')


const app=express()

app.use(express.json())
app.use(cookieParser())


const products=require('./routes/product')
const user=require('./routes/user')
const order=require('./routes/order')

app.use('/products',products)
app.use('/user',user)
app.use('/order',order)

app.use(errorMiddleware)

module.exports=app