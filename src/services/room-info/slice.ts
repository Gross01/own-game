import { createSlice } from "@reduxjs/toolkit";
import { TPlayer, TResPlayer } from "../../utils/types";
import {onClose, onError, onMessage, onOpen} from './actions'
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
    reducers: {
        clearRoomCode: (state) => {
            state.roomCode = null
        },
        clearSocketError: (state) => {
            state.socketError = null
        }
    },
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

                    if (action.payload.players_info) {
                        state.players = action.payload.players_info.map((player: TResPlayer) => {
                            return {
                                userName: player.user_name,
                                isLeader: player.is_leader,
                                userGiud: player.user_GUID,
                                playerIsReady: player.player_ready
                            }
                        })
                    }

                    if (!action.payload.is_leader && !action.payload.user_name) {
                        return 
                    }

                    const findPlayer = state.players.find(player => player.userGiud === action.payload.user_GUID)

                    if (findPlayer) return

                    const newPlayer = {
                        isLeader: Boolean(action.payload.is_leader),
                        userGiud: action.payload.user_GUID,
                        userName: action.payload.is_leader ? 'Ведущий' :  action.payload.user_name,
                        playerIsReady: action.payload.user_ready,
                    }

                    state.players = [...state.players, newPlayer]
                }

                if (action.payload.event === 'user_disconnected') { 
                    state.players = state.players.filter(player => player.userGiud !== action.payload.user_GUID)
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

                if (action.payload['user_ready'] === true) {
                    state.playerIsReady = true
                }
            })
            // post запрос
            .addCase(createRoom.pending, (state) => {
                state.createRoomLoading = true
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                console.log(action.payload)
                state.roomCode = action.payload
                state.createRoomLoading = false
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.createRoomError = action.payload as string
                state.createRoomLoading = false
            })
    }
})

export const {clearRoomCode, clearSocketError} = roomInfoSlice.actions