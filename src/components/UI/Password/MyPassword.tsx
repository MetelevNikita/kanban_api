import { FC, useState } from 'react'
import Image from 'next/image'

// css

import styles from '@/components/UI/Password/MyPassword.module.css'

// img

import glassIcon from '@/asset/UI/glassIcon.svg'

type MyPasswordProps = {
    title: string
    value?: string
    name?: string
    placeholder?: string
    style?: React.CSSProperties
}


const MyPassword: FC<MyPasswordProps> = ({ title, value, name, placeholder, style, ...props}) => {


  const [togglePassword, setTogglePassword] = useState<boolean>(false)


  return (
    <div className={styles.input_password_container}>
        <span className={styles.input_password_title}>{title}</span>

        <div className={styles.input_password_box}>

            <input className={styles.input_password} style={style} name={name} type={(togglePassword) ? 'text' : 'password'} value={value} placeholder={placeholder} {...props} />
            <Image className={styles.input_password_img} width={20} height={20} src={glassIcon} alt={'img'}  onMouseDown={() => {setTogglePassword(true)}} onMouseUp={() => {setTogglePassword(false)}} onMouseLeave={() => {setTogglePassword(false)}}/>

        </div>

    </div>

  )
}

export default MyPassword
