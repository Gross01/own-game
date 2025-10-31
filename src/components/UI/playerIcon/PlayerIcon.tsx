import { TPlayer } from "../../../utils/types";
import styles from './PlayerIcon.module.css'

type TProps = {
    player: TPlayer
}

const PlayerIcon = ({player}: TProps) => {
    return <li className={styles.player}>
        <div>{player.userName ? player.userName[0].toUpperCase() : ''}</div>
            <span className={styles.name}>{player.userName}</span>
            {!player.isLeader && 
            <span style={{color: player.playerIsReady ? '#30B386' : '#E2C95F'}} 
            className={styles.readiness}>{player.playerIsReady ? 'Готов' : 'Ожидание'}</span>}
    </li>
}

export default PlayerIcon