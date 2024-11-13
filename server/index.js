import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookiesParser from 'cookies-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'

const app = express()
app.use(cors({
    credentials : true,
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT

app.get("/", (request, response) => {
// server to client 
    response.json({
        message: "server is running" + PORT
    })
})

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log("Server is running on", PORT);
    })
})
