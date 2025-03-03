const express = require("express")
var routes = express.Router();
// const  { database }  = require("./index3");
var database = require("./index3");

routes.get("/",  (req, res)=>{
    console.log("DATA IS " + database)
    res.json(database);
 });

 
routes.get("/users/:id", function(req, res)

{
    console.log(JSON.stringify(database))
    const userId = parseInt(req.params.id);
    const user = database.find(x=>x.id== userId);
    if(user)
      res.json(user);
    else 
        res.status(404).json({message:'User not found'});

    
})

routes.post('/items', (req, res) => {
    console.log(database)
    console.log(JSON.parse(database));
    const { name } = req.body;
    const newItem = { id: database1.length + 1, name };
   

    database1.push(newItem);
    res.status(201).json(newItem);
});



routes.put("/", (req, res)=>
    {        
        
        const userId = parseInt(req.params.id);
        const userIndex = database.findIndex(x=>x.id== userId);
        if(userIndex!=1)
        {

        database[userIndex]  = {...database[userIndex],...req.body};
        res.json(database[userIndex]);
        }
    
    else
    res.status(404).json({message:'User not found'});

    })

    
routes.delete("/users/:id", (req, res)=>
    {
        const userId = parseInt(req.params.id);
        const userIndex = database.findIndex(x=>x.id== userId);
        if(userIndex!=1)
        {
            const deletedUser = database.splice(userIndex,1);
           res.json(deletedUser);
        }
        else 
        res.status(404).json({message:'User not found'});
})
 
module.exports = routes;