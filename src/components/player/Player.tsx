
import Preloader from './../UI/preloader/Preloader';
import styles from './Player.module.css'
import Button from '../UI/button/Button'
import { useDispatch, useSelector } from '../../services/store';
import { wsSend } from '../../services/room-info/actions';

function Player() {

  const dispatch = useDispatch()
  const playerIsReady = useSelector(state => state.roomInfo.playerIsReady)

  const statusHandler = () => {
    if (playerIsReady) {
      dispatch(wsSend({event: "player_unready"}))
    } else {
      dispatch(wsSend({event: "player_ready"}))
    }
  }

  return (
      <div className={styles.div}>
        <p className={styles.p}>Вы присоединились к игре!</p>
        <span className={styles.wait}>Ожидаем других игроков... <br/> Готовы 2/5</span>
        <div>
          <Preloader />
        </div>
        <Button style={{marginTop: '25px'}} onClick={statusHandler}>{playerIsReady ? 'Отменить готовность' : 'Готов'}</Button>

      </div>
  );
}

export default Player;