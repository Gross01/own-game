
import Preloader from './../UI/preloader/Preloader';
import styles from './Player.module.css'
import Button from '../UI/button/Button'
import { useState } from 'react';

function Player() {

  const [playerIsReady, setPlayerIsReady] = useState(false)

  return (
      <div className={styles.div}>
        <p className={styles.p}>Вы присоединились к игре!</p>
        <span className={styles.wait}>Ожидаем других игроков... <br/> Готовы 2/5</span>
        <div>
          <Preloader />
        </div>
        <Button style={{marginTop: '25px'}} onClick={() => setPlayerIsReady(prev => !prev)}>{playerIsReady ? 'Отменить готовность' : 'Готов'}</Button>

      </div>
  );
}

export default Player;