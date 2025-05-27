import { FC, useState } from 'react'
import Image from 'next/image'

// bootstrap

import style from './OpenCardDecription.module.css'


// type

import { TaskType } from '@/types/types'

interface OpenCardDescriptionProps {
  card: TaskType

}


const OpenCardDescription: FC<OpenCardDescriptionProps> = ({ card }) => {


  const dateCreated = new Date(card.createAt).toLocaleDateString()


  return (

        <div className={style.open_card_description_bottom_box}>

            <div className={style.open_card_description_bottom_date_created}>{dateCreated}</div>

            


            <div className={style.open_card_description_bottom_title}>{card.title}</div> 
            <div className={style.open_card_description_bottom_deascription}>{card.description}</div>

            <div className={style.open_card_info_container}>

                <div className={style.open_card_info_box}>
                    <div className={style.open_card_info_title}>Тип продукта</div>
                    <div className={style.open_card_info_text}>Ролик</div>
                </div>

                <div className={style.open_card_info_box}>
                    <div className={style.open_card_info_title}>Тип работ</div>
                    <div className={style.open_card_info_text}>Разработка с нуля</div>
                </div>

            </div>


            <div className={style.open_card_description_bottom_date_created_line}></div>


            <div className={style.open_card_info_container}>
                <div className={style.open_card_info_box}>
                    <div className={style.open_card_info_title}>Имя</div>
                    <div className={style.open_card_info_text}>Иванов Иван</div>
                </div>

                <div className={style.open_card_info_box}>
                    <div className={style.open_card_info_title}>Телефон</div>
                    <div className={style.open_card_info_text}>8-800-555-35-35</div>
                </div>
            </div>


            <div className={style.open_card_info_container}>
                <div className={style.open_card_info_box}>
                    <div className={style.open_card_info_title}>Имя</div>
                    <div className={style.open_card_info_text}>Иванов Иван</div>
                </div>

                <div className={style.open_card_info_box}>
                    <div className={style.open_card_info_title}>Телефон</div>
                    <div className={style.open_card_info_text}>8-800-555-35-35</div>
                </div>
            </div>


        </div> 

  )
}

export default OpenCardDescription

