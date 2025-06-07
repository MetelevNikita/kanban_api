import { FC, useState } from 'react'
import Image from 'next/image'

// css

import styles from '@/components/element/BoardCard/BoardCard.module.css'

// img

import deleteIcon from '@/asset/board_card/delete_icon.svg'
import importantCard from '@/asset/board_card/important_card.svg'

// 

import { TaskType } from '@/types/types'

// DND kit

import { useSortable} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


interface BoardCardProps {
  task: TaskType
  deleteCurrent: (id: number) => any
  id: {cardId: number | null, setCardId: any}
  boardLabel: string
}

const BoardCard: FC<BoardCardProps> = ({ task, deleteCurrent, id, boardLabel }) => {


  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { accept: ['task'], status: task.status }});


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'grab',
    zIndex: isDragging ? 100 : 'auto',
  };



  const {cardId, setCardId} = id

  const dateCreated = new Date(task.createAt).toLocaleDateString()
  const shortenedDescription = task.description.length > 70 ? `${task.description.slice(0, 70)}...` : task.description

  return (
    <div className={styles.board_card_container} style={style}>


      <div ref={setNodeRef} {...attributes} {...listeners}>

            <div className={styles.board_card_middle}>
              <div className={styles.board_card_middle_title_box}>

                  <div className={styles.board_card_middle_title}>{task.title}</div>

                  <Image width={14} height={14} src={importantCard} alt='important card'/>

              </div>

                <div className={styles.board_card_middle_description}>{shortenedDescription}</div>
            </div>


        </div>

        {/*  */}

        <div className={styles.board_card_bottom_line}></div>

        <div className={styles.board_card_bottom}>


            {
              (task.status === 'inbox') && <div className={styles.board_card_bottom_status} style={{borderColor: '#4BB0CB', color: '#4BB0CB'}}>Ожидание</div>
            }

            {
              (task.status === 'agreed') && <div className={styles.board_card_bottom_status} style={{borderColor: '#3A9A32', color: '#3A9A32'}}>Согласовано</div>
            }

            {
              (task.status === 'rejected') && <div className={styles.board_card_bottom_status} style={{borderColor: '#C24444', color: '#C24444'}}>Отклонено</div>
            }

            {
              (task.status === 'comments') && <div className={styles.board_card_bottom_status} style={{borderColor: '#D7A54A', color: '#D7A54A'}}>Замечания</div>
            }

            {
              (task.status !== 'comments' && task.status !== 'rejected' && task.status !== 'agreed' && task.status !== 'inbox') && <div className={styles.board_card_bottom_status} style={{borderColor: '#2A4587', color: '#2A4587'}}>{boardLabel}</div>
            }



            <div className={styles.board_card_bottom_date}>{dateCreated}</div>
            <div className={styles.board_card_bottom_open_btn} style={(cardId === task.id) ? {backgroundColor: '#B23636'} : {backgroundColor: '#3A9A32'}} onClick={() => {setCardId(task.id)}}>{(cardId === task.id) ? 'Закрыть' : 'Открыть'}</div>
            <Image width={14} src={deleteIcon} alt='delete icon' onClick={() => {deleteCurrent(task.id)}}/>
        </div>

    </div>
  )
}

export default BoardCard
