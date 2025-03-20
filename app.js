import express from 'express'

import {PORT,DB_URI,NODE_ENV} from './config/env.js'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middleware/error.middleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()
app.use(
    cors({
        origin:"*"
    })
)

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser)

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/subscription',subscriptionRouter)

app.use(errorMiddleware)

app.get('/',(req,res)=>{
    res.send('Welcome to the Subscription Tracker API')
})

app.listen(PORT,async()=>{
    console.log(`Subscription Tracker is running on http://localhost:${PORT}`)
    await connectToDatabase()
})

export default app