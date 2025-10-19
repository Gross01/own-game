import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    role: null | string;
}

const initialState: TInitialState = {
    role: localStorage.getItem('role') || null,
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload
        },
        clearRole: (state) => {
            state.role = null
        }
    },
})

export const {setRole, clearRole} = userInfoSlice.actions