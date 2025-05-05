"use client"

import { FC, useEffect, useState } from 'react'

// redux

import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { fetchAllUsers } from './lib/slice/userSlice'
import { fetchAllTasks } from './lib/slice/taskSlice'

// types

import { UserType } from '@/types/types'





const page = () => {

  const [users, setUsers] = useState<UserType[] | any>([])

  const dispatch = useAppDispatch()
  const allUser = useAppSelector(state => state.user.user)
  const allTask = useAppSelector(state => state.task.task)


  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])





  console.log(allUser)








  return (
    <div>

      <button>CLICK</button>

    </div>
  )
}

export default page
