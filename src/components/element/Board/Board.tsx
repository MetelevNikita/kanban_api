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


interface BoardProps {
    task: TaskType[]
    board: BoardType
    color: string
    colorBoard: string
}

const Board: FC<BoardProps> = ({ task, board, color, colorBoard }) => {


  const { refresh, setRefresh } = useContext(RefreshContext)


  const deleteCurrentTask = (id: number) => {
    deleteTask(id)
    setRefresh((prev: Boolean) => !prev) 
  }


  return (
    <div className={styles.board_container} style={{backgroundColor: colorBoard}}>

        <div className={styles.board_top} style={{backgroundColor: color}}>
            <div className={`${styles.board_top_title}`}>{board.label}</div>
        </div>

        {(!task || task.length === 0) ? <div className={styles.no_task}>No Tasks Available</div> : task.map((task: TaskType) => {
          return <BoardCard key={task.id} task={task} deleteCurrent={deleteCurrentTask}/>
        })}

    </div>
  )
}

export default Board
