import express from 'express'

import {PORT,DB_URI,NODE_ENV} from './config/env.js'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import connectToDatabase from './database/mongodb.js'

const app = express()

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/subscription',subscriptionRouter)

app.get('/',(req,res)=>{
    res.send('Welcome to the Subscription Tracker API')
})

app.listen(PORT,async()=>{
    console.log(`Subscription Tracker is running on http://localhost:${PORT}`)
    await connectToDatabase()
})

export default app