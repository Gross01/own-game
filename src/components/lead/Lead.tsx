import { useState } from "react";
import Button from "../UI/button/Button";
import FileUploader from "../UI/file-uploader/FileUploader";
import styles from "./Lead.module.css";
import { useSelector } from "../../services/store";

function Lead() {
  const [mode, setMode] = useState("preset");
  const players = useSelector(store => store.roomInfo.players).filter(player => !player.isLeader)

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Настройки сессии</p>

      <div className={styles.card}>
        <div className={styles.section}>
          <p className={styles.label}>Источник пакета вопросов:</p>

          <label className={styles.radio}>
            <input
              type="radio"
              name="mode"
              value="preset"
              checked={mode === "preset"}
              onChange={() => setMode("preset")}
            />
            <span>Выбрать из готовых паков</span>
          </label>

          <label className={styles.radio}>
            <input
              type="radio"
              name="mode"
              value="upload"
              checked={mode === "upload"}
              onChange={() => setMode("upload")}
            />
            <span>Загрузить свой файл</span>
          </label>
        </div>

        {/* Если выбран "готовый пакет" */}
        {mode === "preset" && (
          <div className={styles.section}>
            <p className={styles.label}>Готовые пакеты:</p>
            <select className={styles.select}>
              <option>Лёгкий старт</option>
              <option>История и культура</option>
              <option>Музыка 2000-х</option>
              <option>Наука и факты</option>
            </select>
            <p className={styles.hint}>
              Описание: 15 вопросов, сложность — средняя
            </p>
          </div>
        )}

        {/* Если выбран "загрузить свой" */}
        {mode === "upload" && (
          <div className={styles.section}>
            <FileUploader />
          </div>
        )}

        {/* Дополнительные настройки */}
        <div className={styles.section}>
          <p className={styles.label}>Дополнительные настройки:</p>

          <div className={styles.row}>
            <span>Первый ход делает:</span>
            <select className={styles.select}>
              {players.map(player => {
                return <option value={player.userGiud} key={player.userGiud}>{player.userName}</option>
              })}
            </select>
          </div>
        </div>

        <Button>Начать игру</Button>
      </div>
    </div>
  );
}

export default Lead;
