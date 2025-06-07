'use client'

import { FC, useEffect, useState, useContext } from 'react'
import { MenuContext, RefreshContext } from './layout'
import { motion, AnimatePresence } from "motion/react"
import { v4 as uuid } from 'uuid'

// DND

import { DndContext, DragEndEvent, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';


// 

import styles from '@/app/main/page.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import BoardSortable from '@/components/element/BoardSortable/BoardSortable'
import Board from '@/components/element/Board/Board'
import BoardCard from '@/components/element/BoardCard/BoardCard'
import OpenCard from '@/components/element/OpenCard/OpenCard'

// types

import { BoardType, UserType, TaskType, BoardTypes } from '@/types/types'

// functions

import { getAllUsers } from '@/functions/users/getAllUsers'
import { getAllTasks } from '@/functions/tasks/getAllTasks'
import { updateTaskStatus } from '@/functions/tasks/updateTaskStatus'
import { updateTaskId } from '@/functions/tasks/updateTaskId'

// fn Boards

import { getBoards } from '@/functions/boards/getBoards'


const page: FC = () => {

  const {menuActive, setMenuActive} = useContext(MenuContext)
  const [cardId, setCardId] = useState<number | null>(null)
  const {refresh, setRefresh} = useContext(RefreshContext)
  const [users, setUsers] = useState<UserType[]>([])
  const [boards, setBoards] = useState<BoardTypes[]>([])
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [activeTask, setActiveTask] = useState<TaskType | null>(null)



  const id = uuid()
  console.log(id)



  // DND kit

  const sensors = useSensors(
    useSensor(PointerSensor),
  )


  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(task => task.id === active.id);
    setActiveTask(task || null);
  }


  const handleDragEnd = async (event: DragEndEvent) => {

    const {active, over} = event;

    console.log(active)
    console.log(over)

      if (!over || active.id === over.id) return;

      // Переносим карточки внутри одной колонки

      if (active.data.current?.status === over.data.current?.status) {
        const activeIndex = tasks.findIndex((task) => task.id === active.id);
        const overIndex = tasks.findIndex((task) => task.id === over.id);


        const updatedTasks = arrayMove(tasks, activeIndex, overIndex);
        setTasks(updatedTasks);

        console.log(updatedTasks)
        await updateTaskId(updatedTasks)


      } else {

        // Переносим карточки между колонками

        setTasks((prevTasks) => 
          prevTasks.map((task) => (
               {
                ...task,
                status: task.id === active.id ? over.data.current?.status || over.id : task.status,
              }
            ))
          );

          await updateTaskStatus(active.id, over.data.current?.status)
          setRefresh(!refresh)
      }

}


        console.log(tasks)



  useEffect(() => {

    const getTask = async () => {
      const res = await getAllTasks()
      const currentTaskCompany = res.filter((task) => task.company === menuActive)
      setTasks(currentTaskCompany)
      return res
    }


    const getUser = async () => {
      const res = await getAllUsers()
      setUsers(res)
      return res
    }

    const getAllBoards = async () => {
      const res = await getBoards()
      setBoards(res.filter((board: BoardTypes) => board.company === menuActive))

    }

    getUser()
    getTask()
    getAllBoards()

  }, [refresh, menuActive])





  const singleTask = tasks.find(item => item.id === cardId)


  if (!users || users.length === 0) {
    return <div>loading</div>
  }


  return (


    <Container fluid className={styles.body_container}>
      <Row>
        <Col>

        <div className={`${styles.board_list_container}, d-flex flex-row justify-content-center`}>

          <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>

              {
                (!boards || boards.length === 0) ? <div>НЕТ РАБОЧИХ ДОСОК</div> : boards.map((item: BoardType, index: number): React.ReactNode => {
                  return <Board id={{cardId, setCardId}} key={index+1} board={item} task={tasks.filter((task) => {return task.status == item.value})}/>
                })
              }
              


            <DragOverlay adjustScale={false}>
                {activeTask ? (
                  <BoardCard task={activeTask} deleteCurrent={() => { console.log('click') } } id={{
                    cardId: null,
                    setCardId: undefined
                  }} boardLabel='' />
                ) : null}
            </DragOverlay>

          </DndContext>

 


          <AnimatePresence>
              {(cardId !== null) && 
                  <motion.div initial={{x: 750}} animate={{x: 150}} exit={{x: 750}} transition={{delay: 0, ease: 0, duration: 0.5}} key={cardId}>
                      <OpenCard card={singleTask} id={{cardId, setCardId}}/>
                  </motion.div>
              }
          </AnimatePresence>


          </div>

        </Col>
      </Row>
    </Container>



  )
}

export default page
