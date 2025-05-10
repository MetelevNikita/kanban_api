import { FC } from 'react'

// css

import './MyButton.css'

// 

interface MyButtonProps {
    text: string
    color: any
    onClick?: (e: any) => void
    type: "button" | "submit" | "reset"
}
const MyButton: FC<MyButtonProps> = ({text, onClick, type, color}) => {
  return (
    <button className={color} type={type} onClick={onClick} >{text}</button>
  )
}

export default MyButton
