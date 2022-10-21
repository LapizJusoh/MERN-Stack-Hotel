/*
REQUIRED INSTALL
1. npm init
2. touch index.js
3. npm i express
4. npm i nodemon
5. npm i dotenv
6. npm i ejs
7. npm i method-override
8. npm i mongoose
9. npm i brcrypt
10. npm i express-session
11. app.set(`views engine`,`ejs`);
12. require(`dotenv`).config();
13. app.use(express.urlencoded({extended: true}));
14. app.use(methodOverride(`_method`));
15. if using Heroku, PROCFILE
*/

/*======================
  DEPENDENCIES
======================*/

const express = require('express')
const session = require(`express-session`);
const cors = require('cors')
const mongoose = require('mongoose')
const hotelsController = require('./controllers/hotelsController.js')

require(`dotenv`).config();

/*======================
  VARIABLES
======================*/

const app = express();
const portNum = process.env.PORT;
const mongoURI = process.env.MONGODB_URI
const db = mongoose.connection;
const whitelist = [`http://localhost:3000`,`http://localhost:3003`]

const corsOption = {
  origin: whitelist,
  methods: ['GET','POST','PUT','DELETE'] // same as just putting nothing here
}

/*======================
  MIDDLE-WARE
======================*/

app.use(session({
  secret:"apL6kgcKHU2qv18G7H0h",
  resave: false,
  saveUninitialized: false
}))
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors(corsOption))
app.use(`/hotel`,hotelsController);

/*======================
  MONGOOSE-CONNECTION
======================*/

mongoose.connect(mongoURI, {useNewURLParser: true}, () => {
  console.log(`The connection with MongoDB is established.`)
})

db.on(`error`,(err)=> console.log(err))

app.listen(portNum, () => {
  console.log(`Currently listening to PORT: `, portNum);
})