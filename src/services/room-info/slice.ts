import { createSlice } from "@reduxjs/toolkit";
import { TPlayer } from "../../utils/types";
import {onClose, onError, onMessage, onOpen} from './actions'

type TInitialState = {
    roomCode: null | string;
    connected: boolean;
    players: TPlayer[] | null;
    error: null | string;
}

const initialState: TInitialState = {
    roomCode: null,
    players: null,
    connected: false,
    error: null,
}

export const roomInfoSlice = createSlice({
    name: 'roomInfo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(onOpen, (state) => {
                state.connected = true
            })
            .addCase(onError, (state, action) => {
                state.error = action.payload
            })
            .addCase(onClose, (state) => {
                state.connected = false
                state.players = null
                state.roomCode = null
            })
            .addCase(onMessage, (state, action) => {
                state.roomCode = action.payload
            })
    }
})
