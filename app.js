import express from 'express'

import {PORT} from './config/env.js'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'

const app = express()

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/subscription',subscriptionRouter)

app.get('/',(req,res)=>{
    res.send('Welcome to the Subscription Tracker API')
})

app.listen(PORT,()=>{
    console.log('Subscription Tracker is running on http://localhost:3000')
})

export default app