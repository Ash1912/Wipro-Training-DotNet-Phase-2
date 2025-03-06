const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    { 
        name:{type:String, required:true},
        
        // address:{type:String, required:true},

        // email:{type:String, required:true},
        contact:{type:String, required:true},
        age :{type:Number, required:true,
            validate:(value)=> value > 20
        }

    }
)

mongoose.model("users", userSchema);
module.exports= mongoose.model("users", userSchema, "Users");