'use client'

import { FC, useEffect, useState, useContext } from 'react'
import { MenuContext } from './layout'

// 

import styles from '@/app/main/page.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import Board from '@/components/element/Board/Board'

// types

import { BoardType, UserType, TaskType } from '@/types/types'

// api

import { getAllUsers } from '@/functions/getAllUsers'
import { getAllTasks } from '@/functions/tasks/getAllTasks'


const page: FC = () => {

  const {menuActive, setMenuActive} = useContext(MenuContext)
  const [users, setUsers] = useState<UserType[]>([])
  const [tasks, setTasks] = useState<TaskType[]>([])

  console.log(menuActive)

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

  }, [])


  const activeCompanyTasks = tasks.filter(item => item.company === menuActive)



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
              return <Board key={index+1} color={item.color} colorBoard={item.colorBoard} board={item} task={activeCompanyTasks.filter((task) => {return task.status == item.value})}/>
            })
          }

          </div>

        </Col>
      </Row>
    </Container>

  )
}

export default page
