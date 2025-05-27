'use client'

import { FC, useEffect, useState, useContext } from 'react'
import { MenuContext, RefreshContext } from './layout'
import { motion, AnimatePresence } from "motion/react"

// 

import styles from '@/app/main/page.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import Board from '@/components/element/Board/Board'
import OpenCard from '@/components/element/OpenCard/OpenCard'

// types

import { BoardType, UserType, TaskType } from '@/types/types'

// api

import { getAllUsers } from '@/functions/getAllUsers'
import { getAllTasks } from '@/functions/tasks/getAllTasks'


const page: FC = () => {

  const {menuActive, setMenuActive} = useContext(MenuContext)
  const [cardId, setCardId] = useState<number | null>(null)
  const {refresh, setRefresh} = useContext(RefreshContext)
  const [users, setUsers] = useState<UserType[]>([])
  const [tasks, setTasks] = useState<TaskType[]>([])



  console.log('cardId', cardId)




 

  useEffect(() => {

    const getTask = async () => {
      const res = await getAllTasks()
      setTasks(res)
      return res
    }


    const getUser = async () => {
      const res = await getAllUsers()
      setUsers(res)
      return res
    }

    getUser()
    getTask()

  }, [refresh])


  const activeCompanyTasks = tasks.filter(item => item.company === menuActive)


  const singleTask = tasks.find(item => item.id === cardId)
  console.log('singleTask', singleTask)



  const boardArr: BoardType[] = [
    {
      id: 1,
      label: 'Входящие',
      value: 'inbox',
      color: '#679CAB',
      colorBoard: '#DBEEF8'
    },
    {
      id: 1,
      label: 'Согласовано',
      value: 'agreed',
      color: '#6CAB67',
      colorBoard: '#C8D9C6'
    },
    {
      id: 1,
      label: 'Отклонено',
      value: 'rejected',
      color: '#AB6767',
      colorBoard: '#E9C8C8'
    },
    {
      id: 1,
      label: 'Замечания',
      value: 'comments',
      color: '#DDBD64',
      colorBoard: '#F2D8AB'
    }

  ]


  const newBoard = users.map((item) => {

      const newBoardCard: BoardType = {
        id: 0,
        value: item.username,
        label: item.username,
        color: '#2A4587',
        colorBoard: '#57607D',
      }

        if (item.company === menuActive) {
          boardArr.push(newBoardCard)
        }

  })


  if (!users || users.length === 0 || !tasks || tasks.length === 0) {
    return <div>loading</div>
  }

  return (


    <Container fluid className={styles.body_container}>
      <Row>
        <Col >

        <div className={`${styles.board_list_container}, d-flex flex-row justify-content-center`}>

          {

            (!boardArr || boardArr.length === 0) ? '' : boardArr.map((item: BoardType, index: number): React.ReactNode => {
              return <Board id={{cardId, setCardId}} key={index+1} color={item.color} colorBoard={item.colorBoard} board={item} task={activeCompanyTasks.filter((task) => {return task.status == item.value})}/>
            })
          }

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
