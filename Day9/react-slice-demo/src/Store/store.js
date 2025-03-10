import { configureStore} from "@reduxjs/toolkit";
import amoutReducer from '../Actions/amoutSlice'; 
   export default  configureStore({
    reducer : 
    {
         amount :amoutReducer
   }
})
