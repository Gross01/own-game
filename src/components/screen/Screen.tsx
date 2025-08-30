import { useParams } from "react-router-dom";
import styles from './Screen.module.css'
import { useEffect } from "react";
import { useDispatch } from "../../services/store";
import { wsDisconnect } from "../../services/room-info/actions";

const players = [
    {
      id: '1',
      name: 'Артём',
      ready: true,
    },
    {
      id: '2',
      name: 'Илья',
      ready: true,
    },
    {
      id: '3',
      name: 'Максим',
      ready: false,
    },
    {
      id: '4',
      name: 'Сергей',
      ready: true,
    },
]

function Screen() {

  const {code} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(wsDisconnect())
    }
  }, [dispatch])

  return (
    <div className={styles.div}>
      <p  className={styles.p}>Код сессии: {code}</p>
      <span className={styles.wait}>Ожидаем игроков...</span>
      <ul className={styles.ul}>
        {players.map(player => {
          return <li className={styles.player} key={player.id}>
              <div>{player.name[0].toUpperCase()}</div>
              <span className={styles.name}>{player.name}</span>
              <span style={{color: player.ready ? '#30B386' : '#E2C95F'}} className={styles.readiness}>{player.ready ? 'Готов' : 'Ожидание'}</span>
          </li>
        })}
      </ul>
    </div>
  );
}

export default Screen;