import { useParams } from "react-router-dom";
import styles from './Screen.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { wsDisconnect } from "../../services/room-info/actions";
import { clearRoomCode } from "../../services/room-info/slice";

function Screen() {

  const {code} = useParams()
  const dispatch = useDispatch()
  const players = useSelector(store => store.roomInfo.players)

  useEffect(() => {
    return () => {
      dispatch(wsDisconnect())
      dispatch(clearRoomCode())
    }
  }, [dispatch])

  return (
    <div className={styles.div}>
      <p  className={styles.p}>Код сессии: {code}</p>
      <span className={styles.wait}>Ожидаем игроков...</span>
      <ul className={styles.ul}>
        {players.map((player, i) => {
          return <li className={styles.player} key={i + 1}>
              <div>{player.userName ? player.userName[0].toUpperCase() : ''}</div>
              <span className={styles.name}>{player.userName}</span>
              {!player.isLeader && 
              <span style={{color: player.playerIsReady ? '#30B386' : '#E2C95F'}} className={styles.readiness}>{player.playerIsReady ? 'Готов' : 'Ожидание'}</span>}
          </li>
        })}
      </ul>
    </div>
  );
}

export default Screen;