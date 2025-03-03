const express = require("express");
var app  = express();
const bodyParser = require('body-parser');
const port = 3000;
 app.use(bodyParser.json());
 let database = [
    { id: 1, name: 'Karan' },
    { id: 2, name: 'Deepak' }
];
app.get("/",  (req, res)=>{
    console.log("DATA IS " + database)
    res.send(database);
 });

 
app.get("/users/:id", function(req, res)

{
    console.log(JSON.stringify(database))
    const userId = parseInt(req.params.id);
    const user = database.find(x=>x.id== userId);
    if(user)
      res.json(user);
    else 
        res.status(404).json({message:'User not found'});

    
})

app.post('/users', (req, res) => {
    const { name } = req.body;
    const newItem = { id: database.length + 1, name };
    database.push(newItem);
    res.status(201).json(newItem);
});



app.put("/users/:id", (req, res)=>
    {        
        const userId = parseInt(req.params.id);
        console.log(userId)
        const userIndex = database.findIndex(x=>x.id== userId);
        console.log(userIndex)
        if(userIndex>=0)
        {
       
        database[userIndex]  = {...database[userIndex],...req.body};
        res.json(database[userIndex]);
        }
    
    else{
    res.status(404).json({message:'User not found'});
    }
    })

    
app.delete("/users/:id", (req, res)=>
    {
        const userId = parseInt(req.params.id);
        console.log(userId)
        const userIndex = database.findIndex(x=>x.id== userId);
        console.log(userIndex)
        if(userIndex>=0)
        {
          const deletedUser = database.splice(userIndex,1);
           res.json(deletedUser);
        }
        else {
        res.status(404).json({message:'User not found'});
} })
app.listen(port, function(req,res)
{
    console.log(`applicationready at port no ${port}`)
})
 
exports.database = database;
