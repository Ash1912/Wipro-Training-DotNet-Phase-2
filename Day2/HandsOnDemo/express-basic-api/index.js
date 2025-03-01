const express = require("express");
var app  = express();

const port = 3000;

// callback methods
// app.httpverb(url, callback(req,res)=>
    // {

    // })
app.get("/", function(req, res){
     res.send("hello1");
} )

app.get("/123", function(req, res)

{
     res.send("123 endpoint called")
})

app.post("/", (req, res)=>
{
    res.send("Data submitted post called")
})



app.put("/", (req, res)=>
    {
        res.send("Data edited post called")
    })

    
app.delete("/", (req, res)=>
    {
        res.send("Data deleted post called")
    })
    
app.listen(port, function(req,res)
{
    console.log(`application ready at port no ${port}`)
})
