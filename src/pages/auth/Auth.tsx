import { useEffect, useState } from 'react';
import Button from '../../components/UI/button/Button';
import styles from './Auth.module.css'
// import { checkRoomCode } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';

function Auth() {

  const [code, setCode] = useState('')
  const [userName, setUserName] = useState('')
  const [borderColor, setBorderColor] = useState<'white' | 'red'>('white')
  const role = useSelector(state => state.userInfo.role)
  const navigate = useNavigate()

  const onClick = () => {
      // checkRoomCode(code.trim())
      //   .then(res => {
      //       if (res.success) {
      //         navigate(`/room/${code}`)
      //       } else {
      //         setBorderColor('red')
      //       }
      //   })
      navigate(`/room/${code}`)
  }

  useEffect(() => {
    if (borderColor === 'red') {
      setTimeout(() => {
        setBorderColor('white')
      }, 1000)
    }
  }, [borderColor])

  return (
    <div className={styles.div}>
        <p className={styles.p}>Введите информацию для входа в сессию:</p>
        <div className={styles.code}>
            {role === 'player' && 
              <input 
                  className={styles.input} 
                  type='text'
                  placeholder='Имя игрока'
                  name='user-name'
                  value={userName ?? ''}
                  onChange={(e) => setUserName(e.target.value)}
              />
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