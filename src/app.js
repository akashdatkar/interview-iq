const express=require('express');
// Require all the routes here
const authRouter=require('./routes/auth.routs');

const app=express();


app.use(express.json())

// Use the routes here
app.use('/api/auth', authRouter);

module.exports = app;
