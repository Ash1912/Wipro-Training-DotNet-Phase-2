
// connect with database
const mongoose = require("mongoose")

const connectDb = async(databaseUrl)=>
{
         const dbOptions  ={
            dbName: "UsersDb"
         };
         try{ 
            await mongoose.connect(databaseUrl, dbOptions);
            console.log("connected successfully")
         }
         catch(error)
         {
            console.log("Not connected")
            console.log(error.name)
         }
         
}
module.exports = connectDb;