import { useParams } from "react-router-dom";
import styles from './Screen.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { wsDisconnect } from "../../services/room-info/actions";
import { clearRoomCode } from "../../services/room-info/slice";
import PlayerIcon from "../UI/playerIcon/PlayerIcon";

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
          return <PlayerIcon player={player} key={i + 1}/>
        })}
      </ul>
    </div>
  );
}

export default Screen;