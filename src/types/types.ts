export type UserType = {
  id: number
  username: string
  avatar: string | any
  email: string
  password: string
  createAt: Date | any
  updateAt: Date | any
  isAdmin: boolean
  profile?: ProfileType | null
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
  title: string
  author: string
  telegramId: number
  company: string
  description: string
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


// header

export type MenuButtonType = {
  name: string
  label: string
  isActive: boolean
}