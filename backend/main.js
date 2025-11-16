import express from "express"
const app = express();
import {connectDB} from './src/config/db.js'
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import authRoutes from './src/routes/authRoutes/auth.js'
import userRoutes from './src/routes/userRoutes/user.js'
import friendRequestRoutes from './src/routes/friendReuqestRoutes/friendRequestRoutes.js'
import cors from 'cors'


dotenv.config();

//database connection
connectDB();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

 
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/friend-request', friendRequestRoutes)

export default app;