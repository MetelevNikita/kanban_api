import { TaskType } from "@/types/types"


export const getAllTasks = async (): Promise<TaskType[]> => {

    try {
        const responce = await fetch('api/task', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        })

        const data = await responce.json()
        return data
        
    } catch (error: Error | unknown) {
        console.log(error)
        return []
    }
}