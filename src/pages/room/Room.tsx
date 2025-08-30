import { useEffect } from "react";
import Lead from "../../components/lead/Lead";
import Player from "../../components/player/Player";
import { useSelector } from "../../services/store"
import Screen from "../../components/screen/Screen"
import { useNavigate } from 'react-router-dom';

const Room = () => {
    const role = useSelector(store => store.userInfo.role)
    const navigate = useNavigate()

    useEffect(() => {
        if (!role) {
            navigate('/')
        }
    }, [role, navigate])

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