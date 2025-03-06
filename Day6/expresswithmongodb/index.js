const  express = require ("express");

const connectDb = require('./connectDb.js');
// const  {join} = require ("path");
const web = require ("./routes/routes.js");
const bodyParser = require("body-parser");

// import{ authrouter } from './routes/auth.js';
// import dotenv from 'dotenv'
// dotenv.config()
var app = express();
app.use(bodyParser.json())
const port = 3000;


app.use("/api", web);
// app.use("/api/user",authrouter );
var databaseUrl ="mongodb://localhost:27017";

connectDb(databaseUrl);
app.listen(port, ()=>
{
  console.log(`Connected at ${port}`);
})
