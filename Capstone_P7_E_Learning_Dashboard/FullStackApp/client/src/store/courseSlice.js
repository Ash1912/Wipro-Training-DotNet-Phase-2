import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
    name: 'courses',
    initialState: [],
    reducers: {
        setCourses: (state, action) => action.payload,
    },
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;
