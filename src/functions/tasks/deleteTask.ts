export const deleteTask = async (id: number) => {
    try {

        const res = await fetch(`api/task/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            alert ("Failed to delete task")
        }

        alert ("Successfully deleted task")
        window.location.reload()

        
    } catch (error) {
        console.error(error)
    }
}