import { FC } from 'react'

// css

import styles from '@/components/element/Board/Board.module.css'

// components

import BoardCard from '../BoardCard/BoardCard'

// types

import { TaskType, BoardType } from '@/types/types'


interface BoardProps {
    task: TaskType[]
    board: BoardType
    color: string
    colorBoard: string
}

const Board: FC<BoardProps> = ({ task, board, color, colorBoard }) => {

  return (
    <div className={styles.board_container} style={{backgroundColor: colorBoard}}>

        <div className={styles.board_top} style={{backgroundColor: color}}>
            <div className={`${styles.board_top_title}`}>{board.label}</div>
        </div>

        {(!task || task.length === 0) ? <div className={styles.no_task}>No Tasks Available</div> : task.map((task: TaskType) => {
          return <BoardCard key={task.id} task={task}/>
        })}

    </div>
  )
}

export default Board
