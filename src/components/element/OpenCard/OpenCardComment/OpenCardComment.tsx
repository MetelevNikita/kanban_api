import { FC, useState, useEffect } from 'react'
import Image from 'next/image'

// style

import styles from './OpenCardComment.module.css'

// functions

import { createComment } from '@/functions/comments/createComments'

// components

import Comment from '../Comment/Comment'

// 

import submitImg from '@/asset/UI//send.svg'

// types

import { CommentType, TaskType, UserType } from '@/types/types'


// 

interface OpenCardCommentProps {
  card: TaskType
  id: string | number
}



const OpenCardComment:FC<OpenCardCommentProps> = ({ card, id }) => {


  const [user, setUser] = useState<UserType | null>(null)
  const [comment, setComment] = useState<CommentType[] | []>([])
  const [newCommentText, setNewCommentText] = useState<string>('')
  const [refrech, setRefrech] = useState<boolean>(false)

  // user id

  const idUser = sessionStorage.getItem('userId')

  useEffect(() => {
    getTask()
    getCurrentUser(idUser!)
  }, [refrech])


  const getTask = async (): Promise<UserType[]> => {

    try {

      const responce = await fetch(`http://localhost:3000/api/task/${id}`)
      const data = await responce.json()
      setComment(data.comment)
      return data
      
    } catch (error) {
      console.log(error)
      return []
    }

  }

  const getCurrentUser = async (id: string): Promise<UserType[]> => {
    try {

      const responce = await fetch(`http://localhost:3000/api/user/${id}`)

      if (!responce.ok) console.log(`${responce.status}`)

      const data = await responce.json()
      setUser(data)
      return data



      
    } catch (error: Error | unknown) {
      console.log(error)
      throw new Error('Произошла ошибка при получении данных пользователя')
    }
  }



  const createNewComment = async () => {
    await createComment({author: user?.username, text: newCommentText, img: user?.avatar}, id)
    setRefrech(!refrech)
  }


  console.log(refrech)


  return (
    <div className={styles.open_card_comment_container}>


        {

          (comment.length < 1) ? <div>Нет комментариев</div> : comment.map((item: CommentType): React.ReactNode => {
            return <Comment key={item.id} comment={item} taskId={id} refreshComments={{refrech, setRefrech}}/>
          })
          
        }


        <div className={styles.open_card_comment_input_container}>



            <div className={styles.open_card_comment_input_box}>

                <input className={styles.open_card_comment_input_text} type="text" name={'comment'} placeholder='Жду дополнения' onChange={(e: any) => {setNewCommentText(e.target.value)}} value={newCommentText} />

                <Image className={styles.open_card_comment_input_container_btn} width={20} height={20} src={submitImg} alt={'tesdt'} onClick={() => {createNewComment()}}/>

            </div>

        </div>
      
    </div>
  )
}

export default OpenCardComment
