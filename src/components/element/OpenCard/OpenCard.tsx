import { FC, useState } from 'react'
import Image from 'next/image'

// bootstrap

import style from './OpenCard.module.css'

// components

import MyButton from '@/components/UI/Button/MyButton'
import OpenCardDescription from './OpenCardDescription/OpenCardDecription'
import OpenCardComment from './OpenCardComment/OpenCardComment'

// img

import backIcon from '@/asset/UI/back_icon.svg'

// 

import { TaskType } from '@/types/types'

// 

interface OpenCardProps {
    card: TaskType | any
    id: {cardId: string | number, setCardId: any}
}


const OpenCard: FC<OpenCardProps> = ({ card, id }) => {

const {cardId, setCardId} = id
const [button, setButton] = useState('Описание проекта')

console.log(card)


const activeButtonStyle = {
    marginLeft: '2px',
    marginRight: '2px',
    width: '184px',
    height: '40px',
    borderRadius: '10px',
    color: 'white',
    backgroundColor: '#2A4587',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

const buttonStyle = {
    marginLeft: '2px',
    marginRight: '2px',
    width: '184px',
    height: '40px',
    borderRadius: '10px',
    border: '1px solid #000000',
    color: '#2A4587',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }


  return (
    <div className={style.open_card_container}>

        <div className={style.open_card_top}>

            <div className={style.open_card_top_menu} onClick={() => {setCardId(null)}}>

                <Image width={22} height={22} src={backIcon} alt='back_icon'/>
                <div className={style.open_card_top_menu_title}>Назад</div>

            </div>


            <div className={style.open_card_top_status}>
                <div className={style.open_card_top_status_title}>Статус</div>

                {
                    (card?.status === 'inbox') ? <div className={style.open_card_top_status_active}>В работе</div> : 
                    (card?.status === 'agreed') ? <div className={style.open_card_top_status_review}>На проверке</div> :
                    (card?.status === 'rejected') ? <div className={style.open_card_top_status_wait}>Ожидает исполнителя</div> :
                    (card?.status === 'comments') ? <div className={style.open_card_top_status_complete}>Завершён</div> :

         
                    (card?.status !== 'inbox') || (card?.status !== 'agreed') || (card?.status !== 'rejected') || (card?.status === 'comments') ? <div className={style.open_card_top_status_complete}>{card?.status}</div> :

                    null
                }

            </div>

        </div>

        <div className={style.open_card_bottom}>

            <div className={style.open_card_bottom_navigation_menu}>

                <MyButton text={'Описание проекта'} value={'Описание проекта'} style={(button !== 'Описание проекта') ? {...buttonStyle} : {...activeButtonStyle}} onClick={(e) => {setButton('Описание проекта')}}/>
                <MyButton text={'Комментарии'} value={'Комментарии'} style={(button !== 'Комментарии') ? {...buttonStyle} : {...activeButtonStyle}} onClick={(e) => {setButton('Комментарии')}}/>

            </div>

            
            {(button === 'Описание проекта') ? <OpenCardDescription card={card} /> : null}
            {(button === 'Комментарии') ? <OpenCardComment id={cardId} card={card}/> : null}


        </div>
      
    </div>
  )
}

export default OpenCard
