import { FC } from 'react'

// 

import styles from './MyButton.module.css'

// 

interface MyButtonProps {
    text: string
    onClick: () => void
    type?: 'button' | 'submit' | 'reset'
    style: React.CSSProperties

}

const MyButton:FC<MyButtonProps> = ({ text, type, onClick, style, ...props }) => {
  return (

    <button style={style} type={type} className={styles.button} onClick={onClick} {...props}>{text}</button>

  )
}

export default MyButton
