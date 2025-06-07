export const updateTaskId = async (updates: any) => {
    try {

        console.log(updates)

        const responce = await fetch("/api/task", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ updates }),
        })

        if (!responce.ok) {
            throw new Error("Failed to fetch")
        }

        const data = await responce.json()
        return data

    } catch (error) {
        console.log(error)
    }
}