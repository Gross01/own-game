import { useState } from "react";
import Button from "../UI/button/Button";
import FileUploader from "../UI/file-uploader/FileUploader";
import styles from "./Lead.module.css";

function Lead() {
  const [mode, setMode] = useState("preset");

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Настройки сессии</p>

      <div className={styles.card}>
        {/* Источник пакета */}
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
            <span>Количество игроков:</span>
            <input type="number" min="2" max="8" defaultValue="4" />
          </div>

          <div className={styles.row}>
            <span>Время на ответ (сек):</span>
            <input type="number" min="10" max="120" defaultValue="30" />
          </div>

          <label className={styles.row}>
            <span>Показывать подсказки:</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>

        <Button>Начать игру</Button>
      </div>
    </div>
  );
}

export default Lead;
