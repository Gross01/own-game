import {combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch as dispatchHook, useSelector as selectorHook } from "react-redux";
import { userInfoSlice } from "./user-info/slice";
import { roomInfoSlice } from "./room-info/slice";
import { socketMiddleware } from "./middleware/socket-middleware";
import { onClose, onError, onMessage, onOpen, wsConnect, wsDisconnect, wsSend } from "./room-info/actions";
import { roleMiddleware } from "./middleware/role-middleware";

const rootReducer = combineReducers({
    userInfo: userInfoSlice.reducer,
    roomInfo: roomInfoSlice.reducer,
})

const roomInfoMiddleware = socketMiddleware({
    wsConnect: wsConnect,
    wsDisconnect: wsDisconnect,
    wsSend: wsSend,
    onOpen: onOpen,
    onMessage: onMessage,
    onClose: onClose,
    onError:onError,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(roomInfoMiddleware, roleMiddleware)
    }
})

export type RootStore = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useDispatch = dispatchHook.withTypes<AppDispatch>()
export const useSelector = selectorHook.withTypes<RootStore>()
