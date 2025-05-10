'use client'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// css

import styles from '@/components/element/Header_Profile/Header_profile.module.css'

// 

interface Header_Profile_Props {
    name: string
    avatar_img: string
    quit_img: string
    quit?: () => void

}



const Header_profile: FC<Header_Profile_Props> = ({ name, avatar_img, quit_img, quit }): React.ReactNode => {
  return (
    <div className={`${styles.header_profile_container} d-flex align-items-center`}>

            <Link href={'/profile'} className={`${styles.header_profile_box} d-flex align-items-center`}>

                <Image className={styles.header_profile_avatar} width={41} height={39} src={avatar_img} alt='avatar' priority={true} unoptimized/>
                <div className={styles.header_profile_title}>{name}</div>

            </Link>


            <Image className={styles.header_profile_quit} src={quit_img} width={37} priority alt='quit' onClick={quit}/>      



      
    </div>
  )
}

export default Header_profile
