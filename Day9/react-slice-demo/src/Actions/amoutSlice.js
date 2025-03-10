import { createSlice } from "@reduxjs/toolkit";
export const amoutSlice = createSlice(
    {
        name :'amount',
        initialState :
        {
             value : 100,
        },
        reducers :
        {
             withdraw :(state, action)=>
             {
                state.value -= action.payload
             },
             deposit : (state, action)=>
             {
                state.value += action.payload
             }
        }
    }
)


export const {withdraw, deposit} = amoutSlice.actions;
export default amoutSlice.reducer;