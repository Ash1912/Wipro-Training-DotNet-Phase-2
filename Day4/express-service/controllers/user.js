const uuid = require("uuid").v4

let users = [
    {id:"1000",
     name:"Deepak Kumar",
     email:"deepak@gmail.com",
     contact:"9999999987"
    }
];

const getUsers = (req,res)=>
{
         res.send(users);
}

const getUserById=(req,res)=>{
   const user = users.find((user)=>user.id === req.params.id);
   res.send(user)
}

const createUser = (req, res)=>{
 const user = req.body;
 console.log(user)
 users.push({...user, id:uuid()})
 res.send("user has been added")

}


const deleteUser = (req,res)=>{
     users = users.filter((user)=>user.id !== req.params.id);
     res.send("user record has been deleted")
}


const editUser = (req, res) =>
{
    const user = users.find((user)=>user.id === req.params.id);
    user.name = req.body.name;
    user.email = req.body.email;
    user.contact = req.body.contact;
    res.send("user record has been edited")
  
}

module.exports = {getUsers, getUserById, createUser, deleteUser, editUser};