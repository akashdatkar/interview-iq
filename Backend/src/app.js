const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
// Require all the routes here
const authRouter=require('./routes/auth.routs');
const interviewRouter = require("./routes/interview.route")

const app=express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
}));

// Use the routes here
app.use('/api/auth', authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app; 
