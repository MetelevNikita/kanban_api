import { FC } from 'react'

// 

import styles from './MyButton.module.css'

// 

interface MyButtonProps {
    text: string
    onClick?: (e: any) => void
    type?: 'button' | 'submit' | 'reset'
    style: React.CSSProperties
    value?: string

}

const MyButton:FC<MyButtonProps> = ({ text, type, onClick, style, value, ...props }) => {
  return (

    <button style={style} value={value} type={type} className={styles.button} onClick={onClick} {...props}>{text}</button>

  )
}

export default MyButton
