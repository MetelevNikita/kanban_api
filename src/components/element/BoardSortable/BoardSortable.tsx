// BoardSortable.tsx (новый компонент)
import { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Board from '@/components/element/Board/Board'

// types

import { BoardTypes, TaskType } from '@/types/types'

interface BoardSortableProps {
  board: BoardTypes
  task: TaskType[]
  id: {cardId: number | null, setCardId: any}
}

const BoardSortable: FC<BoardSortableProps> = ({ board, task, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: board.id, data: { type: 'board', accepts: 'board', status: board.value } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Board board={board} task={task} id={id} />
    </div>
  )
}

export default BoardSortable