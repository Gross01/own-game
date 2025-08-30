import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/button/Button';
import styles from './Home.module.css'
import { setRole } from '../../services/user-info/slice';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect, useState } from 'react';
import Preloader from '../../components/UI/preloader/Preloader';
import { wsConnect, wsSend } from '../../services/room-info/actions';

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const code = useSelector(store => store.roomInfo.roomCode)
  const connected = useSelector(store => store.roomInfo.connected)
  const [sendRequest, setSendRequest] = useState(false)

  useEffect(() => {
    if (connected && !code) {
      dispatch(wsSend('1'))
    }

    if (connected && code && sendRequest) {
        navigate(`/room/${code}`) 
        setSendRequest(false)
    }
  }, [code, navigate, sendRequest, connected, dispatch])

  const leadButton = () => {
    navigate('/auth')
    dispatch(setRole('lead'))
  }

  const playerButton = () => {
    navigate('/auth')
    dispatch(setRole('player'))
  }

  const screenButton = () => {
    dispatch(wsConnect('wss://ws.postman-echo.com/raw'))
    dispatch(setRole('screen'))
    setSendRequest(true)
  }

  if (sendRequest) {
      return <Preloader />
  }

  return (
    <div className={styles.div}>
        <h1 className={styles.title}>Своя игра</h1>
        <p className={styles.p}>Выберите роль, чтобы начать игру</p>
        <div className={styles.buttons}>
            <Button onClick={screenButton}>Экран</Button>
            <Button onClick={playerButton}>Игрок</Button>
            <Button onClick={leadButton}>Ведущий</Button>
        </div>
    </div>
  );
}

export default Home;
