import { ChangeEvent, DragEvent, useState } from 'react'
import styles from './FileUploader.module.css'

const FileUploader = () => {

    const [file, setFile] = useState<File | null>(null)
    const [dragActive, setDragActive] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]){
            setFile(e.target.files[0])
            console.log(e.target.files[0])
        }
    }

    const handleDrag = (e: DragEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!dragActive) setDragActive(true)
    }

    const handleLeave = (e: DragEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (dragActive) setDragActive(false)
    }

    const handleDrop = (e: DragEvent<HTMLFormElement>) => {
        e.preventDefault()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]){
            setFile(e.dataTransfer.files[0])
        }
    }

    return (
        <form 
            className={`${styles.form} ${dragActive ? styles.drag : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleLeave}
            onDrop={handleDrop}
        >
            <p className={styles.dragHere}>Перетащите файл сюда</p>
            <p className={styles.span}>или</p>
            <label className={styles.label}>
                <span>Выберите файл</span>
                <input 
                    type="file" 
                    name="pack" 
                    multiple={false}
                    onChange={handleChange}
                />
                {file && (
                    <p className={styles.fileName}>{file.name}</p>
                )}
            </label>
        </form>
    )
}

export default FileUploader