import { FC, useContext } from 'react'

// css

import styles from '@/components/element/Board/Board.module.css'

// components

import BoardCard from '../BoardCard/BoardCard'

// types

import { TaskType, BoardType } from '@/types/types'

// functions

import { deleteTask } from '@/functions/tasks/deleteTask'

// contexts

import { RefreshContext } from '@/app/main/layout'

// DND

import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDroppable } from '@dnd-kit/core'
import { div } from 'motion/react-client'


interface BoardProps {
    task: TaskType[]
    board: BoardType

    id: {cardId: number | null, setCardId: any}
}

const Board: FC<BoardProps> = ({ task, board, id }) => {
  


  const { setNodeRef: setDropNodeRef } = useDroppable({id: board.id, data: {accepts: 'board', status: board.value, type: 'dropzone'}})
  const { refresh, setRefresh } = useContext(RefreshContext)



  const deleteCurrentTask = (id: number) => {
    deleteTask(id)
    setRefresh((prev: Boolean) => !prev)
  }


  return (
    <div>
      <div className={styles.board_container} style={{backgroundColor: board.colorBoard}} ref={setDropNodeRef}>

          <div className={styles.board_top} style={{backgroundColor: board.color}}>
              <div className={`${styles.board_top_title}`}>{board.label}</div>
          </div>

          <SortableContext items={task} strategy={verticalListSortingStrategy}>

            {(!task || task.length === 0) ? <div className={styles.no_task}>No Tasks Available</div> : task.map((task: TaskType) => {
              return <BoardCard id={id} key={task.id} task={task} boardLabel={board.label} deleteCurrent={deleteCurrentTask}/>
            })}

          </SortableContext>

      </div>
    </div>
  )
}

export default Board
