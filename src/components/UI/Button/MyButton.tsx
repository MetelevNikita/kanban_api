import { FC } from 'react'

// css

import styles from '@/components/UI/Button/MyButton.module.css'

// 

interface MyButtonProps {
    text: string
    color: string
    onClick?: () => void
    type: "button" | "submit" | "reset"
}
const MyButton: FC<MyButtonProps> = ({text, color, onClick, type}) => {
  return (
    <button className={styles.button} style={{backgroundColor: color}} type={type} onClick={onClick} >{text}</button>
  )
}

export default MyButton
