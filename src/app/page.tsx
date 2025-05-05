"use client"

import { FC, useEffect, useState } from 'react'

// redux

import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { fetchAllUsers } from './lib/slice/userSlice'

// types

import { UserType } from '@/types/types'





const page = () => {

  const [users, setUsers] = useState<UserType[] | any>([])

  const dispatch = useAppDispatch()
  const selector = useAppSelector(state => state.user.user)


  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])





  console.log(selector)








  return (
    <div>

      <button>CLICK</button>

    </div>
  )
}

export default page
