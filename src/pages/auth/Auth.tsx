import { useEffect, useState } from 'react';
import Button from '../../components/UI/button/Button';
import styles from './Auth.module.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { createPlayer } from '../../utils/api';
import Preloader from '../../components/UI/preloader/Preloader';

function Auth() {

  const [code, setCode] = useState('')
  const [userName, setUserName] = useState('')
  const [borderColor, setBorderColor] = useState<'white' | 'red'>('white')
  const [showNameError, setShowNameError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<boolean>(false)
  const role = useSelector(state => state.userInfo.role)
  const navigate = useNavigate()

  const onClick = () => {
    setLoading(true);

    const payload = role === 'lead'
        ? { is_leader: "true", game_code: code }
        : { user_name: userName, game_code: code };

    createPlayer(payload)
      .then((res) => {

        if (res.error) {
          setShowNameError(true)
          return 
        }

        navigate(`/room/${code}`)
      })
      .catch((e) => {
        console.log(e);
        setBorderColor("red");
        setError(true)
      })
      .finally(() => setLoading(false));
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
    setShowNameError(false)
  } 

  useEffect(() => {
    if (borderColor === 'red') {
      setTimeout(() => {
        setBorderColor('white')
      }, 1000)
    }
  }, [borderColor])

  if (loading && !error) {
    return <Preloader />
  }

  return (
    <div className={styles.div}>
        <p className={styles.p}>Введите информацию для входа в сессию:</p>
        <div className={styles.code}>
            {role === 'player' && 
            <>
              <input 
                  className={styles.input} 
                  type='text'
                  placeholder='Имя игрока'
                  name='user-name'
                  value={userName ?? ''}
                  onChange={onChangeInput}
              />
              {showNameError && <p className={styles.nameError}>Имя пользователя занято</p>} 
            </>
            } 
            <input style={{borderColor: borderColor}} 
                  className={styles.input} 
                  type="text" 
                  name="ver-code" 
                  value={code ?? ''} 
                  onChange={(e) => setCode(e.target.value)}
                  placeholder='Код сессии'
            />
            <Button onClick={onClick} extraClass={styles.button}>Отправить</Button>
        </div>
    </div>
  );
}

export default Auth;