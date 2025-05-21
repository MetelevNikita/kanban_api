import { FC } from 'react'

// 

import styles from '@/components/UI/Selector/MySelector.module.css'

// types

import { CompanyArrType } from '@/types/types'

interface MySelectorProps {
    title: string
    name: string
    arr: CompanyArrType[]

}

const MySelector: FC<MySelectorProps> = ({ title, arr, name }) => {
  return (

    <div className={styles.select_container}>

    <span className={styles.select_title}>{title}</span>

    <select name={name} className={styles.select_option_container}>

        {arr.map((elem: CompanyArrType, index: number) => {
            return <option className={styles.option} value={elem.value} key={index}>{elem.label}</option>
        })
        }
        
    </select>

    </div>

  )
}

export default MySelector
