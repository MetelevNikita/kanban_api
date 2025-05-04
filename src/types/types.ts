export type UserType = {
  id: number
  username: string
  avatar: string
  email: string
  password: string
  createAt: Date | any
  updateAt: Date | any
  isAdmin: boolean
  profile?: ProfileType | null
  task: TaskType[]
}



export type ProfileType = {
  id: number
  userId: number
  name: string
  lastName: string
  profession: string
  company: string
}



export type TaskType = {
  id: number
  userId: number
  title: string
  description: string
  author: string
  createAt: Date | any
  status: string
  comment: CommentType[]
}


export type CommentType = {
  id: number
  postId: number
  author: string
  text: string
  createAt: Date | any
}