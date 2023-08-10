import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isAdmin: false,
    username : null,
}

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken:(state,action)=>{
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.isAdmin = action.payload.role === "admin" ? true : false;
        },
        getToken:(state,action)=>{
            return state.token;
        },
        removeToken:(state)=>{
            state.token = null;
            state.isAdmin = false;
        }
    }
})

export const {setToken,getToken,removeToken} = tokenSlice.actions;
export default tokenSlice.reducer;