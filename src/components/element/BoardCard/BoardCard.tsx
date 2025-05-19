import { FC } from 'react'
import Image from 'next/image'

// css

import styles from '@/components/element/BoardCard/BoardCard.module.css'

// img

import deleteIcon from '@/asset/board_card/delete_icon.svg'
import importantCard from '@/asset/board_card/important_card.svg'

// 

import { TaskType } from '@/types/types'

// functions

import { deleteTask } from '@/functions/tasks/deleteTask'

interface BoardCardProps {
  task: TaskType
}

const BoardCard: FC<BoardCardProps> = ({ task }) => {
  const dateCreated = new Date(task.createAt).toLocaleDateString()

  const shortenedDescription = task.description.length > 70 ? `${task.description.slice(0, 70)}...` : task.description

  return (
    <div className={styles.board_card_container}>

        <div className={styles.board_card_middle}>
          <div className={styles.board_card_middle_title_box}>

              <div className={styles.board_card_middle_title}>{task.title}</div>

              <Image width={14} height={14} src={importantCard} alt='important card'/>

          </div>

            <div className={styles.board_card_middle_description}>{shortenedDescription}</div>
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
              (task.status !== 'comments' && task.status !== 'rejected' && task.status !== 'agreed' && task.status !== 'inbox') && <div className={styles.board_card_bottom_status} style={{borderColor: '#2A4587', color: '#2A4587'}}>{task.author}</div>
            }



            <div className={styles.board_card_bottom_date}>{dateCreated}</div>
            <Image width={14} src={deleteIcon} alt='delete icon' onClick={() => {deleteTask(task.id)}}/>
        </div>

    </div>
  )
}

export default BoardCard
