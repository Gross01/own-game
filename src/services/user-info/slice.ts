import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    name: string | null;
    role: null | 'lead' | 'player' | 'screen';
}

const initialState: TInitialState = {
    name: null,
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