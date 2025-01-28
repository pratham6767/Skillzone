import { createSlice } from "@reduxjs/toolkit";


const initialState={
    loading: false,
    signupData: null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}


const authSlice= createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state, value) {
            state.signupData = value.payload;
          },
        setToken(sate,value){
            sate.token=value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    }
})

export const {setSignupData,setToken, setLoading}=authSlice.actions;
export default authSlice.reducer;