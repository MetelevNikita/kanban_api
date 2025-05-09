import { FC } from 'react'

// css

import styles from '@/components/UI/Input/MyInput.module.css'



// 

type MyInputProps = {
    type: string
    value?: string
    name?: string
    onFocus: () => void
    placeholder?: string
    style: React.CSSProperties
}


const MyInput: FC<MyInputProps> = ({ type, value, name, onFocus, placeholder, style, ...props}) => {
  return (
    <input className={styles.input} style={style} name={name} type={type} value={value} placeholder={placeholder} onFocus={onFocus} {...props}/>
  )
}

export default MyInput
