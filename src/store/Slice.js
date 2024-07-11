import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isUserLoggedIn : null,
    isUserRole : null,
}


const userAuthSlice = createSlice({
    name:"Auth",
    initialState,
    reducers : {
        checkLoggedIn : (state,action )=>{
            state.isUserLoggedIn = action.payload
        },
        userLogout : (state,action) =>{
            state.isUserLoggedIn = action.payload
        },
        setUserRole : (state,action) =>{
            state.isUserRole = action.payload
        }
    }
})


export const {checkLoggedIn,userLogout, setUserRole} = userAuthSlice.actions;

export default userAuthSlice.reducer;