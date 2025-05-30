import { FC } from 'react'
import Image from 'next/image'

// img

import deleteIcon from '@/asset/board_card/delete_icon.svg'

// styles

import styles from './Comment.module.css'

// function

import { deleteComment } from '@/functions/comments/deleteComment'

// type

import { CommentType } from '@/types/types'

interface CommentProps {
    comment: CommentType
    taskId: string | number
    refreshComments: any
}

const Comment: FC<CommentProps> = ({comment, taskId, refreshComments}) => {


  const localDate = new Date(comment.createAt).toLocaleDateString()
  const localTime = new Date(comment.createAt).toLocaleTimeString()


  const {refrech, setRefrech} = refreshComments


  const deleteCommentTask = async () => {
    await deleteComment(taskId, comment.id)
    setRefrech(!refrech)
  }


  return (
    <div className={styles.comment_container}>


      <div className={styles.comment_box}>

          <div className={styles.comment_bottom}>
              <div className={styles.comment_bottom_text}>{comment.text}</div>
          </div>

          <div className={styles.comment_top}>

            <div className={styles.comment_top_info_box}>

              <div className={styles.comment_top_info_author}>Автор: {comment.author}</div>
              <div className={styles.comment_top_info_date}>{localDate + ' ' + localTime}</div>

            </div>


            <div className={styles.comment_top_delete_box}>
              <Image width={15} height={15} src={deleteIcon} alt='delete_icon' onClick={() => {deleteCommentTask()}}/>
            </div>


          </div>

      </div>


        <img className={styles.comment_top_img} src={comment.img} alt="" />

      
    </div>
  )
}

export default Comment
