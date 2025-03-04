const express = require("express");
var app = express();
const router = require("./routes/routes");
const port = 8000;

const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use("/api", router);
app.listen(port, ()=>
{
    console.log(`Service is reday & listening at port no ${port}`);
} )

//Step 1
// we will create controllers folder 
// in that we will add file which will have all logic
// to perform actual operations on an array 


// Step 2
// we will create a route file with all possible routes


// Step 3
//we will import route file here
