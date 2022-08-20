import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))


app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute) 
app.use('/api/comments', commentRoute) 

async function start() {
    try {
        await mongoose
            .connect(
                process.env.MONGODB_URI)
            .then(() => console.log('DB ok'))
            .catch((err) => console.log('DB error', err));
        app.listen(process.env.PORT || 3001, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
} 
start()
