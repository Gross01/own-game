import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit"
import { RootStore } from "../store";

type TWsActions<T> = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsDisconnect: ActionCreatorWithoutPayload;
    wsSend?: ActionCreatorWithPayload<T>;
    onOpen: ActionCreatorWithoutPayload;
    onMessage?: ActionCreatorWithPayload<T>;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>
}

export const socketMiddleware = <T>(wsActions: TWsActions<T>): Middleware<unknown, RootStore> => {
    return (store) => {
        let socket: WebSocket | null = null
        let connected = false
        const {dispatch} = store
        const {
            wsConnect,
            wsDisconnect,
            onOpen,
            wsSend,
            onMessage,
            onClose,
            onError
        } = wsActions

        return (next) => (action) => {
            if (wsConnect.match(action)) {

                if (socket) return 

                socket = new WebSocket(action.payload)

                socket.onopen = () => {
                    connected = true
                    dispatch(onOpen())
                }

                socket.onerror = () => {
                    dispatch(onError('unknown Error'))
                }

                socket.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data as string)

                        if (onMessage) {
                            dispatch(onMessage(data))
                        }
                    } catch (e) {
                        dispatch(onError((e as Error).message))
                    }
                }

                socket.onclose = () => {
                    if (connected) {
                        dispatch(onClose())
                    }
                    socket = null
                    connected = false
                }
            }

            if (socket && wsDisconnect.match(action)) {
                socket.close()
            }

            if (socket && wsSend && wsSend.match(action)) {
                socket.send(JSON.stringify(action.payload))
            }

            return next(action)
        }
    }
}
