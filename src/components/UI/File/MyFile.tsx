import { FC, useState } from "react"
import Image from "next/image";

// css

import styles from '@/components/UI/File/MyFile.module.css'

// img

import inputFileIcon from '@/asset/UI/input_file_icon.svg'

interface MyFileProps {
    name: string;
    title: string;
}

const MyFile: FC<MyFileProps> = ({ name, title }) => {


    const [fileName, setFileName] = useState<string>('')
    console.log(fileName)

    const shortText = fileName.split('').slice(0, 35).join('')
    console.log(shortText)

    return (

        <div className={styles.file_container}>

            <span className={styles.file_title}>{title}</span>

            <div className={styles.custom_input_file}>

                <input type="file" name={name} id='input' hidden onChange={(e: any) => {setFileName(e.target.value)}}/>
                <label htmlFor={'input'} className={styles.file_input}>

                    <div className={styles.file_input_title}>{(fileName !== '') ? shortText : 'Загрузить файл'}</div>
                    <Image className={styles.file_input_img} width={48} height={44} src={inputFileIcon} alt='input file icon' />

                </label>

            </div>

        </div>

    )
}

export default MyFile
