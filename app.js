const express = require('express');
const app = express();
require('dotenv').config();
const connect = require('./config/db'); 
const userRouter = require('./routes/userRouter');

const appUrl = process.env.APP_URL || 'http://localhost'
const appPort = process.env.APP_PORT || 5050
const apiUrl = '/v1/api';

// Connect mongodb database
connect();

// Middleware
app.use(express.json())

// Route middleware
app.use(apiUrl, userRouter);


app.get('/', (req, res) => {
    res.send('App is running...');
});

app.listen(appPort, () => {
    console.log(`App is running on ${appUrl}:${appPort}`)
});