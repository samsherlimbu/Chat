
const cookieParser = require('cookie-parser');
const cors = require('cors')
const express = require('express');
const authroutes = require('./src/routes/authroutes');
const messageroutes = require('./src/routes/messageroutes');
const userroutes = require('./src/routes/userroutes');
const dbConnect = require('./src/db/ConnectToMongdb');
const { app, server } = require('./src/socket/socket');
require('dotenv').config();

//connect to the database
dbConnect();

const port = process.env.PORT || 3000;

app.use(express.json()); // Important to parse JSON body
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(cookieParser());  // parse cookies


app.use(authroutes);
app.use(messageroutes);
app.use(userroutes)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
