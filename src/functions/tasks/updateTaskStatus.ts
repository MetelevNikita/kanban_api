export const updateTaskStatus = async (id: string | number, status: string) => {

    try {

        console.log(id, status)

        const responce = await fetch(`/api/task/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(status)
        })

        if (!responce.ok) {
            throw new Error(`Error updating task status: ${responce.statusText}`)
        }

        const data = await responce.json()
        console.log(data)
        return data
        
    } catch (error) {
        console.log(error)
    }


}


