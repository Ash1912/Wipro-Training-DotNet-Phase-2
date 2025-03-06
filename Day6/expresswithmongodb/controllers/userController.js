const user = require ("../models/userSchema");

    const getAllUsers = async (req,res) =>
    {
        try{
            console.log("getAllUser");
            const resp = await user.find();
            res.send(resp); 
        }
        catch(error)
        {
            res.send(error);
        }

    }
    const getUserById = async (req,res) =>
        {
            try{
                console.log("getAllUser");
                const resp = await user.findById(req.params.id);
                res.send(resp); 
            }
            catch(error)
            {
                res.send(error);
            }
             
        }

        const addUser =  async (req, res)=>
        {
            const {name, contact, age } = req.body;
        
        const document = new user(
            {
         name : name,
         contact : contact,
         age : age
             })
     try
     {
        const resp = await document.save();

         res.send(resp);

     }
     catch(error)
     {
         res.send(error)
     }
    }
        const editUser = async (req,res)=>
        {
            try
            {
                 const resp = await user.findByIdAndUpdate
                 (req.params.id, req.body);
                 res.send(resp)
            }
            catch(error)
            {
                res.send(error``)
            }

        }

        const deleteUser = async (req,res)=>
        {
            try
            {
            const resp =  await user.findByIdAndDelete(req.params.id);
            res.send(resp);
            }
            catch(error)
            {
                res.send(error)
            }
        }

module.exports = {getAllUsers, getUserById, addUser, 
    editUser, deleteUser};
