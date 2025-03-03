const express = require("express")
var routes = express.Router();

routes.get("/",  (req, res)=>{
     res.send("hello1");
 });

 
routes.get("/123", function(req, res)

{
     res.send("123 endpoint called")
})

routes.post("/", (req, res)=>
{
    res.send("Data submitted post called")
})



routes.put("/", (req, res)=>
    {
        res.send("Data edited post called")
    })

    
routes.delete("/", (req, res)=>
    {
        res.send("Data deleted post called")
    })
 
module.exports = routes;