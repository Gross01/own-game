import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    role: null | 'lead' | 'player' | 'screen';
}

const initialState: TInitialState = {
    role: null,
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload
        }
    },
})

export const {setRole} = userInfoSlice.actions