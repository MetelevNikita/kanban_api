import { BoardTypes } from "@/types/types"


// 

export const getBoards = async () => {
    try {

        const responce = await fetch('/api/board', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!responce.ok) throw new Error(responce.statusText)

        const data = await responce.json()
        return data
        
    } catch (error) {
        console.log(error)
    }
}