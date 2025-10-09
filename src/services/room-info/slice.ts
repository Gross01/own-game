import { createSlice } from "@reduxjs/toolkit";
import { TPlayer } from "../../utils/types";
import {onClose, onError, onMessage, onOpen, wsDisconnect} from './actions'
import { createRoom } from "./thunk";

type TInitialState = {
    roomCode: null | string;
    players: TPlayer[];
    createRoomLoading: boolean,
    createRoomError: string | null,
    socketConnected: boolean,
    socketError: string | null,
    playerIsReady: boolean,
}

const initialState: TInitialState = {
    roomCode: null,
    players: [],
    createRoomLoading: false,
    createRoomError: null,
    socketConnected: false,
    socketError: null,
    playerIsReady: false,
}

export const roomInfoSlice = createSlice({
    name: 'roomInfo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            //socket
            .addCase(onOpen, (state) => {
                state.socketConnected = true
                state.socketError = null
            })
            .addCase(onError, (state, action) => {
                state.socketError = action.payload
            })
            .addCase(onClose, (state) => {
                state.socketConnected = false
                state.players = []
                state.socketError = null
            })
            .addCase(onMessage, (state, action) => {
                console.log(action.payload)
                if (action.payload.status === 'success') {
                    state.playerIsReady = !state.playerIsReady
                }

                if (action.payload.event === 'user_connect') {
                    if (!action.payload.is_leader && !action.payload.user_name) {
                        return 
                    }

                    const newPlayer = {
                        isLeader: Boolean(action.payload.is_leader),
                        userGiud: action.payload.user_GUID,
                        userName: action.payload.is_leader ? 'Ведущий' :  action.payload.user_name,
                        playerIsReady: false,
                    }

                    state.players = [...state.players, newPlayer]
                }

                if (action.payload.event === 'player_ready') {
                    const player = state.players.find(player => player.userGiud === action.payload.user_GUID)
                    if (player) {
                        player.playerIsReady = true
                    }
                }

                if (action.payload.event === 'player_unready') {
                    const player = state.players.find(player => player.userGiud === action.payload.user_GUID)
                    if (player) {
                        player.playerIsReady = false
                    }
                }
            })
            // post запрос
            .addCase(createRoom.pending, (state) => {
                state.createRoomLoading = true
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.roomCode = action.payload
                state.createRoomLoading = false
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.createRoomError = action.payload as string
                state.createRoomLoading = false
            })
    }
})