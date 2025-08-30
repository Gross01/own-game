import Button from "../UI/button/Button";
import FileUploader from "../UI/file-uploader/FileUploader";
import styles from './Lead.module.css'

function Lead() {
  return (
    <div className={styles.div}>
        <p className={styles.p}>Настройки сессии</p>
        <div className={styles.pac}> 
          <p className={styles.download}>Загрузить пакет вопросов</p>
          <FileUploader />
        </div>
        <Button>Начать игру</Button>
    </div>
  );
}

export default Lead