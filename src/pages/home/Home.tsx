import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/button/Button';
import styles from './Home.module.css'
import { setRole } from '../../services/user-info/slice';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect} from 'react';
import Preloader from '../../components/UI/preloader/Preloader';
import { createRoom } from '../../services/room-info/thunk';

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const code = useSelector(store => store.roomInfo.roomCode)
  const loading = useSelector(store => store.roomInfo.createRoomLoading)

  useEffect(() => {
    if (code) {
      navigate(`/room/${code}`)
    }
  }, [code, navigate])

  const leadButton = () => {
    navigate('/auth')
    dispatch(setRole('lead'))
  }

  const playerButton = () => {
    navigate('/auth')
    dispatch(setRole('player'))
  }

  const screenButton = () => {
    dispatch(setRole('screen'))
    dispatch(createRoom())
  }

  if (loading) {
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
