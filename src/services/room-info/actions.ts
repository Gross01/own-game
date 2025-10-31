import { createAction } from "@reduxjs/toolkit";

type wsConnectPayload = string
export const wsConnect = createAction<wsConnectPayload>('roomInfo/wsConnect')

export const wsDisconnect = createAction('roomInfo/wsDisconnect')

type wsSendPayload = {event: string}
export const wsSend = createAction<wsSendPayload>('roomInfo/wsSend')

export const onOpen = createAction('roomInfo/onOpen')

export const onMessage = createAction<any>('roomInfo/onMessage')

export const onClose = createAction('roomInfo/onClose')

export const onError = createAction<string>('roomInfo/onError')