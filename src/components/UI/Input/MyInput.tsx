import { FC } from 'react'
import Image from 'next/image'

// css

import styles from '@/components/UI/Input/MyInput.module.css'

// img

import glassIcon from '@/asset/UI/glassIcon.svg'

type MyInputProps = {
    title: string
    type: string
    value?: string
    name?: string
    placeholder?: string
    style?: React.CSSProperties
}


const MyInput: FC<MyInputProps> = ({ title, type, value, name, placeholder, style, ...props}) => {
  return (
    <div className={styles.input_container}>

        <span className={styles.input_title}>{title}</span>

        <input className={styles.input} style={style} name={name} type={type} value={value} placeholder={placeholder} {...props} />

    </div>

  )
}

export default MyInput
