import { useEffect } from "react";
import Lead from "../../components/lead/Lead";
import Player from "../../components/player/Player";
import { useDispatch, useSelector } from "../../services/store"
import Screen from "../../components/screen/Screen"
import { useNavigate } from 'react-router-dom';
import { wsConnect, wsDisconnect } from "../../services/room-info/actions";
import { SOCKET_BASE_URL } from "../../utils/constants";
import Cookies from "js-cookie";
import Preloader from "../../components/UI/preloader/Preloader";
import { clearRole } from "../../services/user-info/slice";
import { clearSocketError } from "../../services/room-info/slice";

const Room = () => {
    const role = useSelector(store => store.userInfo.role)
    const socketConnected = useSelector(store => store.roomInfo.socketConnected)
    const socketError = useSelector(store => store.roomInfo.socketError)
    const userGuid = Cookies.get('user_GUID')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!socketConnected) {
            dispatch(wsConnect(`${SOCKET_BASE_URL}/${userGuid}`))
        }

        if (socketError) {
            dispatch(clearSocketError())
        }

        return () => {
            dispatch(wsDisconnect());
            if (role === 'screen') {
                dispatch(clearRole())
            }
        };
    }, [socketError, navigate])

    useEffect(() => {
        if (!role) {
            navigate('/')
        }
    }, [role, navigate])

    if (!socketConnected) {
        return <Preloader />
    }

    if (role === 'screen') {
        return <Screen/>
    }

    if (role === 'lead') {
        return <Lead/>
    }

    if (role === 'player') {
        return <Player/>
    }

    return null
}

export default Room